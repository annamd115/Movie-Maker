const xhr = require('./xhr');
const data = require('./data');
const catDom = require('./categoriesDom');;
const elDom = require('./elementsDom');

const whenCategoriesLoad = function () {
  const categoriesData = JSON.parse(this.responseText).categories;
  data.setCategories(categoriesData);
  catDom(categoriesData);
};

const whenMovieElementsLoad = function () {
  const elementsData = JSON.parse(this.responseText).elements;
  data.setElements(elementsData);
  elDom(elementsData);
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
