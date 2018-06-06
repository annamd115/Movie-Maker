const data = require('./data');
const elDom = require('./elementsDom');

const showSelections = (e) => {
  data.getElements().forEach((element) => {
    if (element.id === e.target.id) {
      data.setSelectedElements(element, e.target.checked);
    };
  });
  elDom.budgetDom();
};

const checkedElement = () => {
  document.querySelectorAll('.checkboxes')
    .forEach((checkbox) => checkbox.addEventListener('click', showSelections));
};

const setBudget = () => {
  // e.preventDefault();
  const budget = document.getElementById('budget-input').value;
  data.setBudget(budget);
  elDom.budgetDom();
  document.querySelectorAll('.checkboxes')
    .forEach((checkbox) => checkbox.disabled = false);
};

const submitBtnClick = () => {
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', setBudget);
};

module.exports = {
  checkedElement,
  submitBtnClick,
};
