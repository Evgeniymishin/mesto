export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name.value;
    this._info.textContent = userData.info.value;
  }
}