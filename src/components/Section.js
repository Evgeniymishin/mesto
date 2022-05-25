export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(cardsData) {
    cardsData.forEach((card) => {
      this._renderer(card)
    });
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml)
  }

}