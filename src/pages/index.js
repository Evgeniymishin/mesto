import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

import { 
  popupEditSelector,
  popupAddSelector,
  profileName,
  profileInfo,
  popupPreviewSelector,
  cardTemplate,
  initialCards,
  cardsContainerSelector,
  buttonAdd,
  buttonEdit,
  popupEditForm,
  popupAddForm,
  options
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile-info__title',
  infoSelector: '.profile-info__text'
});

const popupEdit = new PopupWithForm(popupEditSelector, () => {
  userInfo.setUserInfo({name: profileName, info: profileInfo})
  popupEdit.close();
});

const popupPreview = new PopupWithImage(popupPreviewSelector);

const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  data.name = data.title;
  data.link = data.text;
  const card = createCard(data);
  const cardElement = card.createElement();
  cardList.addItem(cardElement);
  popupAddCard.close();
});

const popupEditValidator = new FormValidator(popupEditForm, options);
popupEditValidator.enableValidation();

const popupAddValidator = new FormValidator(popupAddForm, options);
popupAddValidator.enableValidation();

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupPreview.open(data);
    }
  }, cardTemplate);
  return card;
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.createElement();
    cardList.addItem(cardElement);
  }
}, cardsContainerSelector);

cardList.renderItems();

popupEdit.setEventListeners();
popupPreview.setEventListeners();
popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddValidator.disableButtonState();
  popupAddValidator.hideFormInputError();
  popupAddCard.open();
})

buttonEdit.addEventListener('click', () => {
  popupEditValidator.hideFormInputError()
  popupEditValidator.activeButtonState();
  const userData = userInfo.getUserInfo();
  profileName.value = userData.name;
  profileInfo.value = userData.info;
  popupEdit.open();
})

