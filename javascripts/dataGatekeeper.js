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
