const slider = document.getElementById('slider');
const output = document.getElementById('output');
const languageText = document.getElementById('language-text');
const advance = document.getElementById('hours-to-advanced');

// 创建一个用于显示值的标签
// const valueLabel = document.createElement('div');
// valueLabel.classList.add('value-label');
// document.querySelector('.hoursrange').appendChild(valueLabel);

// 更新滑块值和值标签的位置
function updateValueLabel() {
  const sliderWidth = slider.offsetWidth;
  const sliderValue = parseInt(slider.value);
  // const labelWidth = valueLabel.offsetWidth;
  
  // const leftPosition = (sliderWidth * (sliderValue - slider.min)) / (slider.max - slider.min) - (labelWidth / 2);
  // valueLabel.textContent = sliderValue;

  advance.textContent = `Hours to Advance: ${ sliderValue }`;
  
  // valueLabel.style.left = leftPosition + 'px';

  // 根据滑块值更新语言文本
  if (sliderValue >= 700 && sliderValue <= 1000) {
    languageText.innerHTML = 'French<br><br>Spanish';
  } else if (sliderValue >= 800 && sliderValue <= 1100) {
    languageText.textContent = 'English';
  } else if (sliderValue >= 1100 && sliderValue <= 1400) {
    languageText.textContent = 'Hindi';
  } else if (sliderValue >= 2000 && sliderValue <= 2500) {
    languageText.textContent = 'Chinese';
  } else {
    languageText.textContent = '';
  }
}

// 初始化
updateValueLabel();

// 监听滑块值改变事件
slider.addEventListener('input', function() {
  updateValueLabel();
});

const textA = document.getElementById('textA');
const textB = document.getElementById('textB');
const textC = document.getElementById('textC');

function showText(element) {
  element.style.opacity = '1';
}

function hideText(element) {
  element.style.opacity = '0';
}

document.addEventListener('wheel', function(e) {
  // office hours with Soo

  const min = 700, max = 2500;
  const sliderValue = parseInt(slider.value); // convert string to int
  let newSliderValue = slider.value = sliderValue + e.deltaY;
  if (newSliderValue < min ) {
    newSliderValue = min;
  } else if (newSliderValue > max) {
    newSliderValue = max;
  }
  slider.value = newSliderValue; // set slider to new value

  updateValueLabel(); // update slider label

});