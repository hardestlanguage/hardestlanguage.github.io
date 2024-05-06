let app = {

  colors : [
    '#FF4500',
    '#008000',
    '#FF4438',
    '#00008B',
    '#FAD7A0'
  ],

  instances : {},

  data : {

    sheet : [],

  },

  load: {
    sheet: () => {
      app.data.sheet = [
        {
          value: 250
        },
        {
          value: 26
        },
        {
          value: 46
        },
        // New data for additional bars
        {
          value: 26
        },
        {
          value: 27
        }
      ];
  
      // Runs callback
      app.charts.initialize();
    },
    
    initialize: () => {
      app.load.sheet();
    }
  },
  

  charts : {

    clear : () => {

      for ( let box in app.instances ) {

        let instance = app.instances[ box ]

        console.log( instance )

        Composite.clear(  instance.engine.world  )
        Engine.clear(     instance.engine )
        Render.stop(      instance.render )
        Runner.stop(      instance.runner )

        instance.render.canvas.remove()
        instance.render.canvas   = null
        instance.render.context  = null
        instance.render.textures = {}

      }

    },

    ballbars : {

      initialize : ( box ) => {

        let parent = document.querySelector( box )

        let width  = parent.offsetWidth
        let height = parent.offsetHeight

        // Initializes object to house all instances
        let instance = app.instances[ box ] = {}

        // Creates canvas
        instance.canvas = document.createElement( 'canvas' )
        instance.canvas.style.position = 'absolute' // makes canvas be rendered on top of unbounce’s overlay
        parent.appendChild( instance.canvas );

        // Create engine
        instance.engine = Engine.create()

        // Creates renderer
        instance.render = Render.create(
          {
            canvas  : instance.canvas,
            engine  : instance.engine,
            options : {
              width      : width,
              height     : height,
              wireframes : false,
              background : 'transparent',
              pixelRatio : 'auto' // Makes it crisp on retina
            }
          }
        )

        // Creates walls
        let entries = app.data.sheet.length
        let thickness = width * 5/100
        let gap = ( width - ( ( entries + 1 ) * thickness ) ) / entries
        console.log(gap);
        let walls = Composites.stack(
          0,
          height * -9,
          entries + 1,
          1,
          gap,
          0,
          function( x, y ) {
            return Bodies.rectangle(
              x,
              y,
              thickness,
              height * 10,
              {
                isStatic: true,
                render : {
                  fillStyle : 'transparent'
                }
              }
            )
          }
        )

        // Creates ground
        let ground = Bodies.rectangle(
          width * 1/2,
          height - thickness / 2,
          width,
          thickness,
          {
            isStatic: true,
            render : {
              fillStyle : 'transparent'
            }
          }
        )

        Composite.add(
          instance.engine.world,
          [ ground, walls ]
        )

 // Creates balls
for (const [index, entry] of app.data.sheet.entries()) {
  let radius = width * 1 / 100; // Fixed radius value for all balls
  // Calculate emitter position based on index and number of bars
  let emitter =
    (width * (2 * index + 1) / (2 * app.data.sheet.length)) +
    gap / 2;
  let amount = parseInt(entry.value);

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      let ball = Bodies.circle(
        emitter * Common.random(0.95, 1.05),
        radius * -1,
        radius, // Use fixed radius value for all balls
        {
          restitution: 0,
          friction: 1,
          slop: 0,
          frictionStatic: 1,
          render: {
            fillStyle:
              app.colors[
                Math.floor(Math.random() * app.colors.length)
              ],
          },
        }
      );

      // Adds balls to world
      Composite.add(
        instance.engine.world,
        [ball]
      )

    }, i * 100)

  }
}
        //Adds mouse control
        let mouse = Mouse.create( instance.render.canvas )
        let mouseConstraint = MouseConstraint.create( instance.engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        } )

        Composite.add( instance.engine.world, mouseConstraint )

        // Keeps mouse in sync with rendering
        instance.render.mouse = mouse

        // Runs renderer
        Render.run( instance.render )

        // Creates runner
        instance.runner = Runner.create()

        // Runs engine
        Runner.run( instance.runner, instance.engine )

      }

    },

    initialize : () => {

      console.log( app.options.charts )

      for ( let chart of app.options.charts ) {

        let box  = chart[ 0 ]
        let type = chart[ 1 ]

        // Creates each chart
        app.charts[ type ].initialize( box )

      }

    }

  },

  events : {

    resize : () => {

      window.addEventListener( 'resize', () => {

        // Sets width in which desktop and mobile versions are switched
        let threshold = 600

        // Initializes width when resize occurs for the first time
        if ( app.data.width === undefined )
          app.data.width = window.innerWidth

        // Creates aliases
        let previous = app.data.width
        let current = window.innerWidth

        if (

          ( current <= threshold && previous >  threshold ) ||
          ( current >  threshold && previous <= threshold )

        ) {

          // Handles switch between desktop and mobile versions

          // Clears all charts
          app.charts.clear()

          // Draws all charts again
          app.charts.initialize()

        }

        // Updates width
        app.data.width = window.innerWidth

      } )

    },

    initialize : () => {

      app.events.resize()

    }

  },

  initialize: ( options ) => {

    // Creates module aliases
    window.Engine          = Matter.Engine
    window.Render          = Matter.Render
    window.Runner          = Matter.Runner
    window.Bodies          = Matter.Bodies
    window.Composite       = Matter.Composite
    window.Composites      = Matter.Composites
    window.Mouse           = Matter.Mouse
    window.MouseConstraint = Matter.MouseConstraint
    window.Common          = Matter.Common

    // Sets options
    app.options = options

    // Loads dependencies
    app.load.initialize()

    // Attaches events
    app.events.initialize()

  }

}

let options = {

  charts : [

    [ 'figure', 'ballbars' ],

  ]

}

app.initialize( options )

window.addEventListener('load', () => {
  setTimeout(() => {
    const numbers = [85568, 26, 46, 26, 27];
    const container = document.createElement('div');
    container.classList.add('number-container');
    document.body.appendChild(container);

    // 水平分佈數字
    const totalWidth = window.innerWidth;
    const numberWidth = totalWidth / numbers.length;
    
    numbers.forEach((number, index) => {
      const numberElement = document.createElement('div');
      numberElement.classList.add('number');
      numberElement.innerText = number;
    
      
      container.appendChild(numberElement);
    });
  }, 4000); // 
});
