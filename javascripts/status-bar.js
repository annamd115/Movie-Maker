const data = require('./data');

const updateProgress = (selections) => {
  const progressBar = document.getElementById('progressBar');
  const whichCategory = [...new Set(selections.map(item => item.categoryId)),];
  // console.log('from progressDOM', whichCategory);
  if (whichCategory.length === 1) {
    progressBar.classList.add('twentyFive');
  } else if (whichCategory.length === 2) {
    progressBar.classList.add('fifty');
  } else if (whichCategory.length === 3) {
    progressBar.classList.add('seventyFive');
  } else if (whichCategory.length === 4 && data.getBudget() >= 0) {
    progressBar.classList.add('oneHundred');
    document.getElementById('userBudget').classList.add('green');
    document.getElementById('userBudget').classList.remove('red');
    document.getElementById('message').innerHTML = `<h3 class="green">Let's make this movie!!</h3>`;
  } else if (whichCategory.length === 4 && data.getBudget() < 0) {
    progressBar.classList.add('oneHundred');
    document.getElementById('userBudget').classList.add('red');
    document.getElementById('userBudget').classList.remove('green');
    document.getElementById('message').innerHTML = `<h3 class="red">Sorry, insuffient funds.</h3>`;
  };
};

module.exports = {
  updateProgress,
};
