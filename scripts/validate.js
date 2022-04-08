const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  textErrorClass: "popup__error_visible",
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options)
  });
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {
      checkInputValidity(inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const showInputError = (inputElement, errorMessage, options) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.add(options.textErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(options.inputErrorClass);
};

const hideInputError = (inputElement, options) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.remove(options.textErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(options.inputErrorClass);
};

const checkInputValidity = (inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(inputElement, options);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

enableValidation(options); 