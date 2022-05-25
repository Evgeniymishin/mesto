import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { 
  popupEditSelector,
  popupAddSelector,
  profileName,
  profileInfo,
  popupPreviewSelector,
  cardTemplate,
  cardsContainerSelector,
  buttonAdd,
  buttonEdit,
  popupEditForm,
  popupAddForm,
  options,
  popupAvatarSelector,
  baseUrl,
  authToken,
  buttonAvatar
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile-info__title',
  infoSelector: '.profile-info__text',
  avatarSelector: '.profile__avatar'
});

const popupEdit = new PopupWithForm(popupEditSelector, (data) => {
  popupEdit.renderLoading(true);
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.renderLoading(false);
      popupEdit.close();
    })
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
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.createElement();
    cardList.addItem(cardElement);
  }
}, cardsContainerSelector);

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

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: authToken,
    'Content-Type': 'application/json'
  }
})

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  popupAvatar.renderLoading(true);
  api.updateAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
      popupAvatar.close();
    })
})

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

popupAvatar.setEventListeners();

