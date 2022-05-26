import { Popup } from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitEvtHandler = this._submitEvtHandler.bind(this)
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._data);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEvtHandler);
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}