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
