'use strict';

// Модуль валидации формы подачи объявления
(function () {
  var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICE = [0, 1000, 5000, 10000];
  var TIME_CHECK = ['12:00', '13:00', '14:00'];
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MAX_PRICE = 1000000;

  var mainFormElement = document.querySelector('.ad-form');
  var formFieldsElements = document.querySelectorAll('fieldset');

  // Метод перевода формы в неактивное состояние
  var disableForm = function () {
    mainFormElement.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsElements.length; i++) {
      formFieldsElements[i].disabled = true;
    }
  };

  // Метод перевода формы в активное состояние
  var enableForm = function () {
    mainFormElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFieldsElements.length; i++) {
      formFieldsElements[i].disabled = false;
    }

    // Изменение минимальной цены в зависимости от типа жилья
    checkSelectPrice(TYPE_OG_HOUSING, MIN_PRICE);

    // Синхронизация полей заезда/выезда
    TIME_CHECK.forEach(function (element) {
      onTimeSelectChange(element);
    });
  };

  // Метод заполнения поле адреса
  var userAddressInputElement = document.querySelector('#address');
  var insertValueAddress = function (coordinate) {
    userAddressInputElement.value = coordinate();
  };

  // Определение минимальной стоимости в зависимости от типа выбранного жилья
  var priceInputElement = mainFormElement.querySelector('#price');
  var typeSelectElement = mainFormElement.querySelector('#type');

  var onTypeSelectChange = function (typeSelect, priceInput) {
    typeSelectElement.addEventListener('change', function () {
      if (typeSelectElement.value === typeSelect) {
        priceInputElement.placeholder = priceInput;
      }
    });
  };

  // Функция установки минимальной стоимости в placeholder
  var checkSelectPrice = function (objectTypeHousing, objectPrice) {
    for (var i = 0; i < objectTypeHousing.length; i++) {
      onTypeSelectChange(objectTypeHousing[i], objectPrice[i]);
    }
  };

  // Синхронизация полей заезда/выезда
  var timeinSelectElement = mainFormElement.querySelector('#timein');
  var timeoutSelectElement = mainFormElement.querySelector('#timeout');

  var onTimeSelectChange = function (timeSelect) {
    timeinSelectElement.addEventListener('change', function () {
      if (timeinSelectElement.value === timeSelect) {
        timeoutSelectElement.value = timeSelect;
      }
    });
    timeoutSelectElement.addEventListener('change', function () {
      if (timeoutSelectElement.value === timeSelect) {
        timeinSelectElement.value = timeSelect;
      }
    });
  };

  // Функция отображения сообщения об ошибке заполнения полей
  var showError = function (field, messageError) {
    var containerElement = document.createElement('p');
    containerElement.classList.add('error-valid');
    containerElement.textContent = messageError;
    field.style = 'outline: 3px solid #ff5635';
    field.parentElement.appendChild(containerElement);
    field.addEventListener('focus', closeError);
  };

  // Функция закрытия сообщения об ошибке
  var closeError = function (evt) {
    evt.preventDefault();
    valid = true;
    evt.target.style = false;
    var error = evt.target.parentElement.querySelector('p');
    evt.target.parentElement.removeChild(error);
    evt.addEventListener('blur', removeListener);
  };

  // Функция удаления обработчиков
  var removeListener = function (evt) {
    evt.preventDefault();
    evt.target.removeEventListener('focus', closeError);
    evt.target.removeEventListener('blur', removeListener);
  };

  // Функция валидации полей форм
  var checkForm = function (checkFields) {
    for (var i = 0; i < checkFields.length; i++) {
      // Проверяем заголовок объявления
      if (checkFields[i].name === 'title') {
        if (checkFields[i].value.length === 0) {
          valid = false;
          showError(checkFields[i], 'Заполните текст заголовка');
        }

        if (checkFields[i].value.length < MIN_LENGTH_TITLE && checkFields[i].value.length > 0) {
          valid = false;
          showError(checkFields[i], 'Текст заголовка должен содержать не менее ' + MIN_LENGTH_TITLE + ' символов');
        }

        if (checkFields[i].value.length > MAX_LENGTH_TITLE) {
          valid = false;
          showError(checkFields[i], 'Текст заголовка должен содержать не более ' + MAX_LENGTH_TITLE + ' символов');
        }
      }
      // Проверяем цену в зависимости от типа жилья
      var placeholderValue = parseInt(checkFields[i].getAttribute('placeholder'), 10);

      if (checkFields[i].name === 'price') {

        if (checkFields[i].value.length === 0 || checkFields[i].value === '0') {
          valid = false;
          showError(checkFields[i], 'Заполните цену объявления');
        }

        if (checkFields[i].value > MAX_PRICE) {
          valid = false;
          showError(checkFields[i], 'Максимальная цена ' + MAX_PRICE);
        }

        if (checkFields[i].value > 0 && checkFields[i].value < placeholderValue) {
          valid = false;
          showError(checkFields[i], 'Минимальная цена ' + placeholderValue);
        }
      }
    }
    // Отправляем форму
    if (valid) {
      mainFormElement.submit();
    }
  };

  // Устанавливаем обработчик валидации на форму
  var valid = true;
  var fieldInputElements = mainFormElement.querySelectorAll('input');

  mainFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkForm(fieldInputElements);
  });

  window.form = {
    disable: disableForm,
    enable: enableForm,
    insertAddress: insertValueAddress
  };
})();
