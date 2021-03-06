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
