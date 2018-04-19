const loadCategories = require('./categories');
const loadMovieElements = require('./movie-elements');
// const printDepartmentDom = require('./departmentDom');
// const data = require('./data');

const whenCategoriesLoad = function () {
  const categoriesData = JSON.parse(this.responseText).categories;
  console.log('categories', categoriesData);
  // data.setCategories(categoriesData);
};

const whenMovieElementsLoad = function () {
  const elementsData = JSON.parse(this.responseText).elements;
  console.log('elements', elementsData);
  // data.setElements(elementsData);
  // print to dom
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
