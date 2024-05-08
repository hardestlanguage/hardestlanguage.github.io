
document.addEventListener("DOMContentLoaded", function() {
 
  const animationContainer = document.getElementById('animationContainer');


  const languages = ['English?', 'Chinese?', 'French?', 'Spanish?', 'Hindi?'];

  
  const delay = 1000; // milliseconds

  
  function animateText(index) {
    
    if (index < languages.length) {
   
      const newText = document.createElement('div');
      newText.textContent = languages[index];
     
      newText.classList.add('fade-in');
     
      animationContainer.appendChild(newText);
      
      setTimeout(() => {
       
        animationContainer.removeChild(newText);

        animateText(index + 1);
      }, delay);
    }
  }

  animateText(0);
});


