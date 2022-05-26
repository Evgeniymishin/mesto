export default class Card {
  constructor({data, handleCardClick, setLike, deleteLike, handleDeleteCardClick}, templateSelector, authorId) {
    this._data = data;
    this._owner = data.owner;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._authorId = authorId;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._cardId = data._id;
    this._likes = data.likes;
  }

  _getTemplate() {
    this._template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return this._template;
  }

  _removeElement(card) {
    card.remove();
  }

  deleteCard() {
    this._removeElement(this._element);
  }

  _likeCard(data) {
    this._elementLike.classList.add('element__like_active');
    this._setLike(data);
  }

  _dislikeCard(data) {
    this._elementLike.classList.remove('element__like_active');
    this._deleteLike(data);
  }

  setLikeCount(data) {
    this._likeCount.textContent = String(data.likes.length);
  }

  _checkIsAuthorCard() {
    if (this._authorId !== this._owner._id) {
      this._removeElement(this._elementDeleteButton);
    }
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains('element__like_active')) {
        console.log(this._likes.length);
        this._dislikeCard(this._data);
      } else {
        console.log(this._likes.length);
        this._likeCard(this._data);
      }
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCardClick();
    });
    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  _checkLikedCards() {
    this._likes.forEach((likeAuthor) => {
      if (likeAuthor._id === this._authorId) {
        this._elementLike.classList.add('element__like_active');
      }
    })
  }

  createElement() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name; 
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPhoto.setAttribute('src', this._link); 
    this._elementPhoto.setAttribute('alt', this._name);
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._element.setAttribute('id', this._cardId);
    this._likeCount = this._element.querySelector('.element__like-count');
    this.setLikeCount(this._data);
    this._setEventListeners();
    this._checkIsAuthorCard();
    this._checkLikedCards();
    return this._element;
  }
}