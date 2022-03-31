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

const root = document.querySelector('.root');
const buttonEdit = root.querySelector('.profile-info__edit-button');
const buttonAdd = root.querySelector('.profile__add-button');
const elements = root.querySelector('.elements');
const elementTemplate = root.querySelector('#element').content;
const profileName = root.querySelector('.profile-info__title');
const profileInfo = root.querySelector('.profile-info__text');
const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_title');
const popupEditInputNameInfo = popupEdit.querySelector('.popup__input_type_text');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_title');
const popupAddInputNameURL = popupAdd.querySelector('.popup__input_type_text');
const popupPreview = root.querySelector('.popup_type_preview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
const popupPreviewImg = popupPreview.querySelector('.popup__preview-img');
const popupPreviewCaption = popupPreview.querySelector('.popup__preview-caption');

renderInitialCards();
buttonEdit.addEventListener('click', runEditForm);
buttonAdd.addEventListener('click', runAddForm);
popupEditForm.addEventListener('submit', submitEditForm);
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddForm.addEventListener('submit', submitAddForm);
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupPreviewCloseButton.addEventListener('click', () => closePopup(popupPreview));

function renderInitialCards() { 
  initialCards.forEach(function(item) { 
    const element = createElement(item.name, item.link);
    elements.prepend(element);
  }); 
} 

function createElement(name, link) {
  const element = elementTemplate.querySelector('.element').cloneNode(true); 
  element.querySelector('.element__title').textContent = name; 
  element.querySelector('.element__photo').setAttribute('src', link); 
  element.querySelector('.element__photo').setAttribute('alt', name);
  const elementLike = element.querySelector('.element__like');
  const elementDeleteButton = element.querySelector('.element__delete-button');
  const elementPhoto = element.querySelector('.element__photo');
  elementLike.addEventListener('click', () => toggleLike(elementLike));
  elementDeleteButton.addEventListener('click', () => removeElement(element));
  elementPhoto.addEventListener('click', () => runReviewForm(element));
  return element;
}

function runEditForm() {
  popupEditInputName.value = profileName.textContent;
  popupEditInputNameInfo.value = profileInfo.textContent;
  openPopup(popupEdit);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitEditForm(event) {
  event.preventDefault();
  profileName.textContent = popupEditInputName.value; 
  profileInfo.textContent = popupEditInputNameInfo.value;
  closePopup(popupEdit);
}

function runAddForm() {
  openPopup(popupAdd);
  
}

function submitAddForm(event) {
  event.preventDefault();
  const name = popupAddInputName.value;
  const link = popupAddInputNameURL.value;  
  const element = createElement(name, link);
  elements.prepend(element);
  closePopup(popupAdd);
  popupAddForm.reset();
}

function toggleLike(elementLike) {
  elementLike.classList.toggle('element__like_active');
}

function removeElement(element) {
  element.remove();
}

function runReviewForm(element) {
  popupPreviewImg.src = element.querySelector('.element__photo').src;
  popupPreviewImg.alt = element.querySelector('.element__photo').alt;
  popupPreviewCaption.textContent = element.querySelector('.element__title').textContent;
  openPopup(popupPreview);
}