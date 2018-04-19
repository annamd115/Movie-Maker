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
