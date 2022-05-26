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
const buttonAvatar = root.querySelector('.profile__avatar-container');

const popupEdit = root.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAdd = root.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAvatar = root.querySelector('.popup_type_update-avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');

const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_add';
const popupPreviewSelector = '.popup_type_preview';
const cardTemplate = '#element';
const cardsContainerSelector = '.elements';
const popupAvatarSelector = '.popup_type_update-avatar';
const popupConfirmSelector = '.popup_type_confirm';

const cohortId = 'cohort-41';
const authToken = 'f150d627-0cdf-4ba4-bcd4-9ff479e7dfa9';
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohortId}`;

export {
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  profileName,
  profileInfo,
  cardTemplate,
  options,
  cardsContainerSelector,
  buttonEdit,
  buttonAdd,
  popupEditForm,
  popupAddForm,
  baseUrl,
  authToken,
  popupAvatarSelector,
  buttonAvatar,
  popupConfirmSelector,
  popupAvatarForm
}