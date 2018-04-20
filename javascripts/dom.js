// const events = require('./events');
const elementsOutputDiv = document.getElementById('elements-container');

const domString = (categories, elements) => {
  let domStrang = '';
  categories.forEach((category) => {
    domStrang += `<div class="row">`;
    domStrang +=   `<div class="col-md-12">`;
    domStrang +=     `<h2>${category.id}</h2>`;
    domStrang +=   `</div>`;
    elements.forEach((element) => {
      domStrang += `<div class="row">`;
      domStrang += `</div>`;
    });
    domStrang += `</div>`;
  });
  return domStrang;
};

const printElementsToDom = (categories, elements) => {
  elementsOutputDiv.innerHTML = domString(categories, elements);
  // events.addElementEvents();
};

module.exports = printElementsToDom;
