import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input =>
      inputValues[input.name] = input.value);

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
  
}