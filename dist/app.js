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

const setSelectedElements = (selectedElement, isChecked) => {
  if (isChecked) {
    selectedElements.push(selectedElement);
  } else {
    selectedElements.indexOf(selectedElement);
  }
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

},{"./categoriesDom":1,"./data":2,"./elementsDom":4,"./events":5,"./xhr":8}],4:[function(require,module,exports){
// const events = require('./events');
const data = require('./data');

const elDom = (element) => {
  document.getElementById(element.categoryId).innerHTML +=
  `<div class="col-md-4 checkbox">
    <input type="checkbox" class="checkboxes" name="options" id="${element.id}" autocomplete="off" disabled>
    <label for="${element.id}">${element.name}</label>
  </div>`;
};

const budgetDom = () => {
  const budget = data.getBudget();
  const allSelectedElements = data.getSelectedElements();
  let cost = 0;
  allSelectedElements.forEach((selectedElement) => {
    cost += selectedElement.cost;
  });
  document.getElementById('budget-container').innerHTML =
  `<div class="col-md-12">
    <h2>Budget: $${budget}</h2>
    <div>${printElements(allSelectedElements)}</div>
    <h3 id="userBudget">Remaining Budget: $${budget - cost}</h3>
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
const progress = require('./status-bar');
const selections = [];

const showSelections = (e) => {
  data.getElements().forEach((element) => {
    if (element.id === e.target.id) {
      data.setSelectedElements(element, e.target.checked);
      selections.push(element);
    };
  });
  elDom.budgetDom();
  progress.updateProgress(selections);
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

},{"./data":2,"./elementsDom":4,"./status-bar":7}],6:[function(require,module,exports){
const dataGatekeeper = require('./dataGatekeeper');

dataGatekeeper.initializer();

},{"./dataGatekeeper":3}],7:[function(require,module,exports){
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

},{"./data":2}],8:[function(require,module,exports){
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
