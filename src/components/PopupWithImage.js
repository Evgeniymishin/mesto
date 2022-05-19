import { Popup } from './Popup.js'

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__preview-img');
    this._caption = this._popup.querySelector('.popup__preview-caption');
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}