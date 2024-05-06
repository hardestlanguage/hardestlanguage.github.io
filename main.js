// 等待文檔完全載入後再執行
document.addEventListener("DOMContentLoaded", function() {
  // 获取动画容器
  const animationContainer = document.getElementById('animationContainer');

  // 定义需要显示的文字数组
  const languages = ['English?', 'Chinese?', 'French?', 'Spanish?', 'Hindi?'];

  // 定义动画延迟时间
  const delay = 1000; // milliseconds

  // 逐个显示文字的函数
  function animateText(index) {
    // 判断是否已经显示完所有文字
    if (index < languages.length) {
      // 创建一个新的文本节点
      const newText = document.createElement('div');
      newText.textContent = languages[index];
      // 添加样式以实现动画效果
      newText.classList.add('fade-in');
      // 将新文本节点添加到动画容器中
      animationContainer.appendChild(newText);
      // 添加延迟以便逐个显示文字
      setTimeout(() => {
        // 在延迟后移除当前文字
        animationContainer.removeChild(newText);
        // 递归调用自身以显示下一个文字
        animateText(index + 1);
      }, delay);
    }
  }

  // 在文檔完全載入後執行動畫
  animateText(0);
});


