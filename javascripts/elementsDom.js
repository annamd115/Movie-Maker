// const events = require('./events');
const data = require('./data');

const elDom = (element) => {
  document.getElementById(element.categoryId).innerHTML +=
  `<div class="col-md-4 checkbox">
    <input type="checkbox" class="checkboxes disabled" name="options" id="${element.id}" autocomplete="off">
    <label for="${element.id}">${element.name}</label>
  </div>`;
};

const budgetDom = (selectedElements) => {
  const budget = data.getBudget();
  const allSelectedElements = data.getSelectedElements();
  let cost = 0;
  allSelectedElements.forEach((selectedElement) => {
    cost += selectedElement.cost;
  });
  document.getElementById('budget-container').innerHTML =
  `<div class="col-md-12">
    <h3>${budget - cost}</h3>
    <div>${printElements(allSelectedElements)}</div>
  </div>`;
};

const printElements = (selectedElements) => {
  let domstring = '';
  selectedElements.forEach((selectedElement) => {
    domstring += `<p> ${selectedElement.name} : $${selectedElement.cost}</p>`;
  });
  return domstring;
};

const printToDom = (elements) => {
  elements.forEach(elDom);
};

module.exports = {
  printToDom,
  budgetDom,
};
