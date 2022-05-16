import { Popup } from './Popup.js'

export class PopupImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__preview-img');
    this._caption = this._popupSelector.querySelector('.popup__preview-caption');
  }

  open(name, url) {
    this._image.src = url;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}