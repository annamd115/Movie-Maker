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
