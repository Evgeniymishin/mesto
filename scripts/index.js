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

let root = document.querySelector('.root');
let popup = root.querySelector('.popup');
let editButton = root.querySelector('.profile-info__edit-button');
let addButton = root.querySelector('.profile__add-button');
let elements = root.querySelector('.elements');
let profileTitleInput = root.querySelector('.popup__input_type_title');
let profileTextInput = root.querySelector('.popup__input_type_text');
let profileName = root.querySelector('.profile-info__title');
let profileInfo = root.querySelector('.profile-info__text');
let form = root.querySelector('.popup__form');
let popupTitle = root.querySelector('.popup__title')
let submitButton = root.querySelector('.popup__submit-button');
let popupType;


renderInitialCards()

form.addEventListener('submit', formSubmitHandler)

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile-info__edit-button')) {
    runEditForm(event);
  } else if (event.target.classList.contains('popup__close-button')) {
    toggleForm();
  } else if (event.target.classList.contains('profile__add-button')) {
    runAddForm(event);
  } 
});

function renderInitialCards() {
  initialCards.forEach(function(item) {
    addElement(item.name, item.link)
  });
}

function addElement(name, link) {
  const elementTemplate = root.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__photo').setAttribute('src', link);
  element.querySelector('.element__photo').setAttribute('alt', name);

  elements.prepend(element);
}

function runEditForm(event) {
  event.preventDefault();
  popupType = 'edit';
  popupTitle.textContent = 'Редактировать профиль';
  profileTitleInput.placeholder = 'Ваше имя';
  profileTextInput.placeholder = 'Род деятельности';
  submitButton.textContent = 'Сохранить';
  toggleForm(); 
  profileTitleInput.value = profileName.textContent;
  profileTextInput.value = profileInfo.textContent;
}

function toggleForm() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  if (popupType === 'edit') {
    formSubmitHandlerEdit(event);
    popupType === null;
  } else if (popupType === 'add') {
    formSubmitHandlerAdd(event);
    popupType === null;
  }
}

function formSubmitHandlerEdit(event) {
  event.preventDefault();
  profileName.textContent = profileTitleInput.value; 
  profileInfo.textContent = profileTextInput.value;
  toggleForm();
}

function runAddForm(event) {
  event.preventDefault();
  popupType = 'add';
  popupTitle.textContent = 'Новое место';
  profileTitleInput.placeholder = 'Название';
  profileTextInput.placeholder = 'Ссылка на картинку';
  submitButton.textContent = 'Добавить';
  profileTitleInput.value = '';
  profileTextInput.value = '';
  toggleForm();
}

function formSubmitHandlerAdd(event, name, link) {
  event.preventDefault();
  name = profileTitleInput.value;
  link = profileTextInput.value;  
  addElement(name, link);
  toggleForm();
}


