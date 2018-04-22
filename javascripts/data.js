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
