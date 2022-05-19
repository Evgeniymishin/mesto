import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, options} from './constants.js';

const root = document.querySelector('.root');
const buttonEdit = root.querySelector('.profile-info__edit-button');
const buttonAdd = root.querySelector('.profile__add-button');
const elements = root.querySelector('.elements');
const profileName = root.querySelector('.profile-info__title');
const profileInfo = root.querySelector('.profile-info__text');
const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_title');
const popupEditInputNameInfo = popupEdit.querySelector('.popup__input_type_title');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_title');
const popupAddInputNameURL = popupAdd.querySelector('.popup__input_type_text');
const popupPreview = root.querySelector('.popup_type_preview');
const popupPreviewImg = popupPreview.querySelector('.popup__preview-img');
const popupPreviewCaption = popupPreview.querySelector('.popup__preview-caption');
const popupList = root.querySelectorAll('.popup');
const formList = Array.from(document.querySelectorAll(options.formSelector));
const formValidators = {};

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
    const element = createCardObject(item, '#element', runPreviewForm);
    addCardToContainer(element);
  }); 
}

function runEditForm() {
  formValidators[ popupEditForm.name ].activeButtonState();
  formValidators[ popupEditForm.name ].hideFormInputError();
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
  formValidators[ popupAddForm.name ].hideFormInputError();
  openPopup(popupAdd);
}

function submitAddForm(event) {
  const item = {
      name: popupAddInputName.value,
      link: popupAddInputNameURL.value,
  };
  const element = createCardObject(item, '#element', runPreviewForm);
  addCardToContainer(element);
  closePopup(popupAdd);
  popupAddForm.reset();
  formValidators[ popupAddForm.name ].disableButtonState();
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
    formValidators[ formElement.name ] = form;
    form.enableValidation();
  })
}

function createCardObject(item, template, funcRunForm) {
  const card = new Card(item, template, funcRunForm);
  const element = card.createElement();
  return element;
}

function addCardToContainer(element) {
  elements.prepend(element);
}