const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  textErrorClass: "popup__error_visible",
};

const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  textErrorClass,
} = obj;

const enableValidation = (formSelector, inputSelector, submitButtonSelector,
   inactiveButtonClass, inputErrorClass, textErrorClass) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector,
      inactiveButtonClass, inputErrorClass, textErrorClass)
  });
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, textErrorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {
      checkInputValidity(inputElement, inputErrorClass, textErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const showInputError = (inputElement, inputErrorClass, textErrorClass, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.add(textErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (inputElement, inputErrorClass, textErrorClass) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.remove(textErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (inputElement, inputErrorClass, textErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass, textErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, inputErrorClass, textErrorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

enableValidation(
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  textErrorClass
);