(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ouputDiv = document.getElementById('elements-container');

const catDom = (categories) => {
  let domString = '';
  categories.forEach(category => {
    domString +=
    `<div class="row">
      <h2>${category.categoryName}</h2>
      <div id="${category.id}" class="selections row"></div>
    </div>`;
    // need to make an id for elements to go in
  });
  return domString;
};

const printToDom = (categories) => {
  ouputDiv.innerHTML = catDom(categories);
};

module.exports = printToDom;

},{}],2:[function(require,module,exports){
let categories = [];
let elements = [];
const selectedElements = [];
let budget = 0;

const getBudget = () => {
  return budget;
};

const setBudget = (newBudget) => {
  budget = newBudget * 1;
};

const getCategories = () => {
  return categories;
};

const setCategories = (categoriesArray) => {
  categories = categoriesArray;
};

const getElements = () => {
  return elements;
};

const setElements = (elementsArray) => {
  elements = elementsArray;
};

const getSelectedElements = () => {
  return selectedElements;
};

const setSelectedElements = (selectedElement) => {
  selectedElements.push(selectedElement);
};

module.exports = {
  getBudget,
  setBudget,
  getCategories,
  setCategories,
  getElements,
  setElements,
  getSelectedElements,
  setSelectedElements,
};

},{}],3:[function(require,module,exports){
const xhr = require('./xhr');
const data = require('./data');
const catDom = require('./categoriesDom');;
const elDom = require('./elementsDom');
const events = require('./events');

const whenCategoriesLoad = function () {
  const categoriesData = JSON.parse(this.responseText).categories;
  data.setCategories(categoriesData);
  catDom(categoriesData);
};

const whenMovieElementsLoad = function () {
  const elementsData = JSON.parse(this.responseText).elements;
  data.setElements(elementsData);
  elDom.printToDom(elementsData);
  events.checkedElement();
  events.submitBtnClick();
};

const badCall = function () {
  console.error('shit broke');
};

const initializer = () => {
  xhr.loadCategories(whenCategoriesLoad, badCall);
  xhr.loadMovieElements(whenMovieElementsLoad, badCall);

};

module.exports = {
  initializer,
};

},{"./categoriesDom":1,"./data":2,"./elementsDom":4,"./events":5,"./xhr":7}],4:[function(require,module,exports){
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

},{"./data":2}],5:[function(require,module,exports){
const data = require('./data');
const elDom = require('./elementsDom');

let allElements = [];

const showSelections = (e) => {
  allElements = data.getElements();
  const selectedElement = e.target.id;
  allElements.forEach((element) => {
    if (element.id === selectedElement) {
      data.setSelectedElements(element);
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
  const checkboxes = document.getElementsByClassName('checkboxes');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].classList.remove('disabled');
  }
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

// const clickCheckboxes = () => {

// };

module.exports = {
  checkedElement,
  submitBtnClick,
  addCosts,
};

},{"./data":2,"./elementsDom":4}],6:[function(require,module,exports){
const dataGatekeeper = require('./dataGatekeeper');

dataGatekeeper.initializer();

},{"./dataGatekeeper":3}],7:[function(require,module,exports){
const loadCategories = (loadFunction, errorFunction) => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', loadFunction);
  myRequest.addEventListener('error', errorFunction);
  myRequest.open('GET', '../db/categories.json');
  myRequest.send();
};

const loadMovieElements = (loadFunction, errorFunction) => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', loadFunction);
  myRequest.addEventListener('error', errorFunction);
  myRequest.open('GET', '../db/movie-elements.json');
  myRequest.send();
};

module.exports = {
  loadMovieElements,
  loadCategories,
};

},{}]},{},[6]);
