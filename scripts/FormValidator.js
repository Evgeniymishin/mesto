export class FormValidator {
  constructor(form, options) {
    this._form = form;
    this._options = options;
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners() {
      const inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
      const buttonElement = this._form.querySelector(this._options.submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.classList.add(this._options.textErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._options.inputErrorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.classList.remove(this._options.textErrorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._options.inputErrorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._options.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._options.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }
}