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
let profileName = root.querySelector('.profile-info__title');
let profileInfo = root.querySelector('.profile-info__text');
const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
let popupEditInputName = popupEdit.querySelector('.popup__input_type_title');
let popupEditInputNameInfo = popupEdit.querySelector('.popup__input_type_text');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
let popupAddInputName = popupAdd.querySelector('.popup__input_type_title');
let popupAddInputNameURL = popupAdd.querySelector('.popup__input_type_text');
const popupPreview = root.querySelector('.popup_type_preview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
let popupPreviewImg = popupPreview.querySelector('.popup__preview-img');
let popupPreviewCaption = popupPreview.querySelector('.popup__preview-caption');

renderInitialCards();
buttonEdit.addEventListener('click', runEditForm);
buttonAdd.addEventListener('click', runAddForm);
elements.addEventListener('click', (event) => {
  const element = event.target.closest('.element');
  if (event.target.classList.contains('element__like')) {
    toggleLike(element);
  } else if (event.target.classList.contains('element__delete-button')) {
    removeElement(element);
  } else if (event.target.classList.contains('element__photo')) {
    runReviewForm(element);
  }
})

function renderInitialCards() { 
  initialCards.forEach(function(item) { 
    let element = createElement(item.name, item.link);
    elements.prepend(element); 
  }); 
} 

function createElement(name, link) {
  const elementTemplate = root.querySelector('#element').content; 
  const element = elementTemplate.querySelector('.element').cloneNode(true); 
  element.querySelector('.element__title').textContent = name; 
  element.querySelector('.element__photo').setAttribute('src', link); 
  element.querySelector('.element__photo').setAttribute('alt', name);
  return element; 
}

function runEditForm() {
  openPopup(popupEdit);
  popupEditInputName.value = profileName.textContent;
  popupEditInputNameInfo.value = profileInfo.textContent;
  popupEditForm.addEventListener('submit', submitEditForm);
  popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
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
  popupAddForm.addEventListener('submit', submitAddForm);
  popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
}

function submitAddForm(event) {
  event.preventDefault();
  let name = popupAddInputName.value;
  let link = popupAddInputNameURL.value;  
  let element = createElement(name, link);
  elements.prepend(element);
  popupAddInputName.value = "";
  popupAddInputNameURL.value = "";
  closePopup(popupAdd);
}

function toggleLike(element) {
  let like = element.querySelector('.element__like');
  like.classList.toggle('element__like_active');
}

function removeElement(element) {
  element.remove();
}

function runReviewForm(element) {
  popupPreviewImg.src = element.querySelector('.element__photo').src;
  popupPreviewImg.alt = element.querySelector('.element__photo').alt;
  popupPreviewCaption.textContent = element.querySelector('.element__title').textContent;
  openPopup(popupPreview);
  popupPreviewCloseButton.addEventListener('click', () => closePopup(popupPreview));
}