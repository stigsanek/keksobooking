'use strict';

// Валидация формы подачи объявления
(function () {
  var mainFormElement = document.querySelector('.ad-form');
  var mapFormFilterElements = document.querySelector('.map__filters').querySelectorAll('select');
  var formFieldsElements = document.querySelectorAll('fieldset');
  var priceInputElement = mainFormElement.querySelector('#price');
  var typeSelectElement = mainFormElement.querySelector('#type');

  //// Определение минимальной стоимости в зависимости от типа выбранного жилья
  var onTypeSelectChange = function (typeSelect, priceInput) {
    typeSelectElement.addEventListener('change', function () {
      if (typeSelectElement.value === typeSelect) {
        priceInputElement.placeholder = priceInput;
      }
    });
  };

  for (var i = 0; i < TYPE_OG_HOUSING.length; i++) {
    onTypeSelectChange(TYPE_OG_HOUSING[i], MIN_PRICE[i]);
  }

  //// Функция отображения сообщение об ошибке заполнения полей
  var showError = function (field, messageError) {
    var containerElement = document.createElement('p');
    containerElement.classList.add('error-valid');
    containerElement.textContent = messageError;
    field.style = 'outline: 3px solid #ff5635';
    field.parentElement.appendChild(containerElement);
    field.addEventListener('focus', closeError);
  };

  //// Функция закрытия сообщения об ошибке
  var closeError = function (evt) {
    evt.preventDefault();
    valid = true;
    evt.target.style = false;
    var error = evt.target.parentElement.querySelector('p');
    evt.target.parentElement.removeChild(error);
    evt.addEventListener('blur', removeListener);
  };

  //// Функция удаления обработчиков
  var removeListener = function (evt) {
    evt.preventDefault();
    evt.target.removeEventListener('focus', closeError);
    evt.target.removeEventListener('blur', removeListener);
  };

  //// Функция валидации полей форм
  var checkForm = function (checkFields) {
    for (var i = 0; i < checkFields.length; i++) {
      // Проверяем заголовок объявления
      if (checkFields[i].name === 'title') {
        if (checkFields[i].value.length === 0) {
          valid = false;
          showError(checkFields[i], 'Заполните текст заголовка');
        }

        if (checkFields[i].value.length < 30 && checkFields[i].value.length > 0) {
          valid = false;
          showError(checkFields[i], 'Текст заголовка должен содержать не менее 30 символов');
        }

        if (checkFields[i].value.length > 100) {
          valid = false;
          showError(checkFields[i], 'Текст заголовка должен содержать не более 100 символов');
        }
      }
      // Проверяем цену в зависимости от типа жилья
      var placeholderValue = parseInt(checkFields[i].getAttribute('placeholder'), 10);

      if (checkFields[i].name === 'price') {

        if (checkFields[i].value.length === 0 || checkFields[i].value === '0') {
          valid = false;
          showError(checkFields[i], 'Заполните цену объявления');
        }

        if (checkFields[i].value > 1000000) {
          valid = false;
          showError(checkFields[i], 'Максимальная цена 1 000 000');
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

  //// Устанавливаем обработчик событий на форму для валидации при попытке отправки данных пользователем
  var valid = true;
  var fieldInputElements = mainFormElement.querySelectorAll('input');

  mainFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkForm(fieldInputElements);
  });

  //// Синхронизация полей заезда/выезда
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

  for (i = 0; i < TIME_CHECK.length; i++) {
    onTimeSelectChange(TIME_CHECK[i]);
  }

  window.form = {
    // Метод добавления/удаления disabled всем полям форм
    disabled: function () {
      for (var i = 0; i < mapFormFilterElements.length; i++) {
        mapFormFilterElements[i].disabled = true;
      }
      for (i = 0; i < formFieldsElements.length; i++) {
        formFieldsElements[i].disabled = true;
      }
    },

    enabled: function () {
      for (i = 0; i < mapFormFilterElements.length; i++) {
          mapFormFilterElements[i].disabled = false;
      }
      for (i = 0; i < formFieldsElements.length; i++) {
        formFieldsElements[i].disabled = false;
      }
    }
  }
}) ();

