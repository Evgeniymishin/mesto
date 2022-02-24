let root = document.querySelector('.root');
let editButton = root.querySelector('.profile-info__edit-button');
let popup = root.querySelector('.popup');
let closeButton = root.querySelector('.popup__close-button');
let profileTitle = root.querySelector('.popup__input_type_title');
let profileSubtitle = root.querySelector('.popup__input_type_subtitle');
let form = root.querySelector('.popup__container');
let profileName = root.querySelector('.profile-info__title');
let profileInfo = root.querySelector('.profile-info__subtitle');

editButton.addEventListener('click', runEditForm);
closeButton.addEventListener('click', closeForm);
form.addEventListener('submit', formSubmitHandler);

function runEditForm() {
  popup.classList.add('popup_opened');
  let profileName = root.querySelector('.profile-info__title');
  profileTitle.value = profileName.textContent;
  let profileInfo = root.querySelector('.profile-info__subtitle');
  profileSubtitle.value = profileInfo.textContent;
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitle.value; 
  profileInfo.textContent = profileSubtitle.value;
  closeForm();
}