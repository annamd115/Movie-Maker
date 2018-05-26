const data = require('./data');
const elDom = require('./elementsDom');

let allElements = [];

const showSelections = (e) => {
  console.log('e', e);
  allElements = data.getElements();
  const selectedElement = e.target.id;
  allElements.forEach((element) => {
    if (element.id === selectedElement) {
      data.setSelectedElements(element, e.checked);
    };
  });
  addCosts();
};

const checkedElement = () => {
  const checkboxes = document.getElementsByClassName('checkboxes');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', showSelections);
  };
};

const setBudget = (e) => {
  e.preventDefault();
  const budget = document.getElementById('budget-input').value;
  data.setBudget(budget);
};

const submitBtnClick = () => {
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', setBudget);
};

const addCosts = () => {
  // const budget = data.getBudget();
  const allSelectedElements = data.getSelectedElements();
  elDom.budgetDom(allSelectedElements);
};

module.exports = {
  checkedElement,
  submitBtnClick,
  addCosts,
};
