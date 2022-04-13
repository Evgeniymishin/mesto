import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const buttonEdit = root.querySelector('.profile-info__edit-button');
const buttonAdd = root.querySelector('.profile__add-button');
const elements = root.querySelector('.elements');
const profileName = root.querySelector('.profile-info__title');
const profileInfo = root.querySelector('.profile-info__text');
const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditSaveButton = popupEdit.querySelector('.popup__button-save');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_title');
const popupEditInputNameInfo = popupEdit.querySelector('.popup__input_type_text');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddSaveButton = popupAdd.querySelector('.popup__button-save');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_title');
const popupAddInputNameURL = popupAdd.querySelector('.popup__input_type_text');
const popupPreview = root.querySelector('.popup_type_preview');
const popupPreviewImg = popupPreview.querySelector('.popup__preview-img');
const popupPreviewCaption = popupPreview.querySelector('.popup__preview-caption');
const popupList = root.querySelectorAll('.popup');
const formList = Array.from(document.querySelectorAll(options.formSelector));

renderInitialCards();
enableValidation();
buttonEdit.addEventListener('click', runEditForm);
buttonAdd.addEventListener('click', runAddForm);
popupEditForm.addEventListener('submit', submitEditForm);
popupAddForm.addEventListener('submit', submitAddForm);
popupList.forEach((popup) => {
  popup.addEventListener('click', () => closeFormByArea(event, popup));
})

function renderInitialCards() { 
  initialCards.forEach(function(item) { 
    const card = new Card(item, '#element', runPreviewForm);
    const element = card.createElement();
    elements.prepend(element);
  }); 
}

function runEditForm() {
  popupEditSaveButton.classList.remove(options.inactiveButtonClass);
  popupEditSaveButton.removeAttribute("disabled");
  popupEditInputName.value = profileName.textContent;
  popupEditInputNameInfo.value = profileInfo.textContent;
  openPopup(popupEdit);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeFormByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeFormByEsc);
}

function submitEditForm(event) {
  profileName.textContent = popupEditInputName.value; 
  profileInfo.textContent = popupEditInputNameInfo.value;
  closePopup(popupEdit);
}

function runAddForm() {
  openPopup(popupAdd);
}

function submitAddForm(event) {
  const item = {
      name: popupAddInputName.value,
      link: popupAddInputNameURL.value,
  };
  const card = new Card(item, '#element', runPreviewForm);
  const element = card.createElement();
  elements.prepend(element);
  closePopup(popupAdd);
  popupAddForm.reset();
  popupAddSaveButton.classList.add(options.inactiveButtonClass);
  popupAddSaveButton.setAttribute("disabled", true);
}

function closeFormByArea(event, popup) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__button-close')) {
    closePopup(popup);
  }
}

function closeFormByEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function runPreviewForm(name, url) {
  popupPreviewImg.src = url;
  popupPreviewImg.alt = name;
  popupPreviewCaption.textContent = name;
  openPopup(popupPreview);
}

function enableValidation() {
  formList.forEach((formElement) => {
    const form = new FormValidator(formElement, options);
    form.enableValidation();
  })
}