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
let budget = 0;

const getBudget = () => {
  return budget;
};

const setBudget = (newBudget) => {
  budget = newBudget;
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

module.exports = {
  getBudget,
  setBudget,
  getCategories,
  setCategories,
  getElements,
  setElements,
};

},{}],3:[function(require,module,exports){
const xhr = require('./xhr');
const data = require('./data');
const catDom = require('./categoriesDom');;
const elDom = require('./elementsDom');

const whenCategoriesLoad = function () {
  const categoriesData = JSON.parse(this.responseText).categories;
  console.log('categories', categoriesData);
  data.setCategories(categoriesData);
  catDom(categoriesData);
  console.log(catDom);
};

const whenMovieElementsLoad = function () {
  const elementsData = JSON.parse(this.responseText).elements;
  console.log('elements', elementsData);
  data.setElements(elementsData);
  elDom(elementsData);
  console.log(elDom);
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

},{"./categoriesDom":1,"./data":2,"./elementsDom":4,"./xhr":6}],4:[function(require,module,exports){
const elDom = (element) => {
  document.getElementById(element.categoryId).innerHTML +=
  `<div class="col-md-4 checkbox disabled">
    <input type="checkbox" name="options" id="${element.id}" autocomplete="off" disabled>
    <label for="${element.id}">${element.name}</label>
  </div>`;
};

const printToDom = (elements) => {
  elements.forEach(elDom);
};

module.exports = printToDom;

},{}],5:[function(require,module,exports){
const dataGatekeeper = require('./dataGatekeeper');

dataGatekeeper.initializer();

},{"./dataGatekeeper":3}],6:[function(require,module,exports){
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

},{}]},{},[5]);
