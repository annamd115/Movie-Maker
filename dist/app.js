(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loadCategories = (loadFunction, errorFunction) => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', loadFunction);
  myRequest.addEventListener('error', errorFunction);
  myRequest.open('GET', '../db/categories.json');
  myRequest.send();
};

module.exports = loadCategories;

},{}],2:[function(require,module,exports){
let categories = [];
let elements = [];

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
  getCategories,
  setCategories,
  getElements,
  setElements,
};

},{}],3:[function(require,module,exports){
const loadCategories = require('./categories');
const loadMovieElements = require('./movie-elements');
// const printElementsToDom = require('./dom');
const data = require('./data');

const whenCategoriesLoad = function () {
  const categoriesData = JSON.parse(this.responseText).categories;
  console.log('categories', categoriesData);
  data.setCategories(categoriesData);
};

const whenMovieElementsLoad = function () {
  const elementsData = JSON.parse(this.responseText).elements;
  console.log('elements', elementsData);
  data.setElements(elementsData);
  // printElementsToDom(elementsData);
};

const badCall = function () {
  console.error('shit broke');
};

const initializer = () => {
  loadCategories(whenCategoriesLoad, badCall);
  loadMovieElements(whenMovieElementsLoad, badCall);
};

module.exports = {
  initializer,
};

},{"./categories":1,"./data":2,"./movie-elements":5}],4:[function(require,module,exports){
const dataGatekeeper = require('./dataGatekeeper');

dataGatekeeper.initializer();

},{"./dataGatekeeper":3}],5:[function(require,module,exports){
const loadMovieElements = (loadFunction, errorFunction) => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', loadFunction);
  myRequest.addEventListener('error', errorFunction);
  myRequest.open('GET', '../db/movie-elements.json');
  myRequest.send();
};

module.exports = loadMovieElements;

},{}]},{},[4]);
