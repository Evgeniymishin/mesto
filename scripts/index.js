let root = document.querySelector('.root');
let editButton = root.querySelector('.profile-info__edit-button');
let popup = root.querySelector('.popup');
let closeButton = root.querySelector('.popup__close-button');
let profileTitle = root.querySelector('.popup__input_type_title');
let profileText = root.querySelector('.popup__input_type_text');
let form = root.querySelector('.popup__container');
let profileName = root.querySelector('.profile-info__title');
let profileInfo = root.querySelector('.profile-info__text');

editButton.addEventListener('click', runEditForm);
closeButton.addEventListener('click', closeForm);
form.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', closeFormByArea);

function runEditForm() {
  popup.classList.add('popup_opened');
  profileTitle.value = profileName.textContent;
  profileText.value = profileInfo.textContent;
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitle.value; 
  profileInfo.textContent = profileText.value;
  closeForm();
}

function closeFormByArea(evt) {
  if (evt.target === evt.currentTarget) {
    closeForm();
  }
}