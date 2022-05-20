export default class FormValidator {
  constructor(form, options) {
    this._form = form;
    this._options = options;
    this._inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners() {
      this._toggleButtonState(this._inputList, this._buttonElement);
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputList, this._buttonElement);
        });
      });
    };

  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = inputElement.nextElementSibling;
    this._errorElement.classList.add(this._options.textErrorClass);
    this._errorElement.textContent = errorMessage;
    inputElement.classList.add(this._options.inputErrorClass);
  };

  _hideInputError(inputElement) {
    this._errorElement = inputElement.nextElementSibling;
    this._errorElement.classList.remove(this._options.textErrorClass);
    this._errorElement.textContent = '';
    inputElement.classList.remove(this._options.inputErrorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButtonState(this._buttonElement);
    } else {
      this.activeButtonState(this._buttonElement);
    }
  }

  activeButtonState() {
    this._buttonElement.classList.remove(this._options.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  disableButtonState() {
    this._buttonElement.classList.add(this._options.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }
  
  hideFormInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}