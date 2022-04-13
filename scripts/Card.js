export class Card {
  constructor(data, templateSelector, runPreviewForm) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._runPreviewForm = runPreviewForm;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._toggleLike();
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._removeElement();
    });
    this._elementPhoto.addEventListener('click', () => {
      this._runPreviewForm(this._name, this._link);
    });

  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _removeElement() {
    this._elementDeleteButton.closest('.element').remove();
  }

  createElement() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name; 
    this._element.querySelector('.element__photo').setAttribute('src', this._link); 
    this._element.querySelector('.element__photo').setAttribute('alt', this._link);
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._setEventListeners();
    return this._element;
  }
}