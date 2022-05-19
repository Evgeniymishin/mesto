const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  textErrorClass: "popup__error_visible",
};

const root = document.querySelector('.root');
const profileName = root.querySelector('.popup__input_type_title');
const profileInfo = root.querySelector('.popup__input_type_text');
const buttonEdit = root.querySelector('.profile-info__edit-button');
const buttonAdd = root.querySelector('.profile__add-button');

const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');

const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_add';
const popupPreviewSelector = '.popup_type_preview';
const cardTemplate = '#element';
const cardsContainerSelector = '.elements';

export {
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  profileName,
  profileInfo,
  cardTemplate,
  initialCards,
  options,
  cardsContainerSelector,
  buttonEdit,
  buttonAdd,
  popupEditForm,
  popupAddForm
}