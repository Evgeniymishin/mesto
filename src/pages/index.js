import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

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
  buttonAvatar,
  popupConfirmSelector,
  popupAvatarForm
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile-info__title',
  infoSelector: '.profile-info__text',
  avatarSelector: '.profile__avatar'
});

let tempCard = null;
let authorId = null;

const popupEdit = new PopupWithForm(popupEditSelector, (data) => {
  popupEdit.renderLoading(true);
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.renderLoading(false);
    })
});

const popupPreview = new PopupWithImage(popupPreviewSelector);

const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  popupAddCard.renderLoading(true);
  data.name = data.title;
  data.link = data.text;
  api.addCard(data)
    .then((res) => {
      const card = createCard(res);
      const cardElement = card.createElement();
      cardList.addItem(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })
});

const popupEditValidator = new FormValidator(popupEditForm, options);
popupEditValidator.enableValidation();

const popupAddValidator = new FormValidator(popupAddForm, options);
popupAddValidator.enableValidation();

const popupAvatarValidator = new FormValidator(popupAvatarForm, options);
popupAvatarValidator.enableValidation();

const popupConfirm = new PopupWithConfirm(popupConfirmSelector, (data) => {
    api.deleteCard(data)
      .then(() => {
        tempCard.deleteCard();
      })
      .then(() => {
        tempCard = null;
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
)

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupPreview.open(data);
    },
    setLike: (data) => {
      api.setLike(data)
        .then((res) => {
          card.setLikeCount(res);
          card.addLikeClass();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((res) => {
        card.setLikeCount(res);
        card.removeLikeClass();
      })
        .catch((err) => {
          console.log(err);
        })
    },
    handleDeleteCardClick: () => {
      tempCard = card;
      popupConfirm.open(data);
    }
  }, cardTemplate, authorId);
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
popupConfirm.setEventListeners();


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
    authorId = userData._id;
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
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    })
})

buttonAvatar.addEventListener('click', () => {
  popupAvatarValidator.disableButtonState();
  popupAvatar.open();
})

popupAvatar.setEventListeners();

