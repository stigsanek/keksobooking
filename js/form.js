'use strict';

// Модуль валидации формы подачи объявления
(function () {
  var typeHousePriceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var mainFormElement = document.querySelector('.ad-form');
  var formFieldsElements = document.querySelectorAll('fieldset');
  Array.from(formFieldsElements);

  // Метод перевода формы в неактивное состояние
  var disableForm = function () {
    mainFormElement.classList.add('ad-form--disabled');
    formFieldsElements.forEach(function (it) {
      it.disabled = true;
    });
  };

  // Метод перевода формы в активное состояние
  var enableForm = function () {
    mainFormElement.classList.remove('ad-form--disabled');
    formFieldsElements.forEach(function (it) {
      it.disabled = false;
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

  var onTypeSelectChange = function () {
    priceInputElement.min = typeHousePriceMap[typeSelectElement.value];
    priceInputElement.placeholder = typeHousePriceMap[typeSelectElement.value];
  };

  typeSelectElement.addEventListener('change', onTypeSelectChange);

  // Синхронизация полей заезда/выезда
  var timeinSelectElement = mainFormElement.querySelector('#timein');
  var timeoutSelectElement = mainFormElement.querySelector('#timeout');

  var onTimeInChange = function () {
    timeoutSelectElement.value = timeinSelectElement.value
  };
  var onTimeOutChange = function () {
    timeinSelectElement.value = timeoutSelectElement.value
  };

  timeinSelectElement.addEventListener('change', onTimeInChange);
  timeoutSelectElement.addEventListener('change', onTimeOutChange);

  // Не валидные поля подсвечиваются красной рамкой
  var inputElements = mainFormElement.querySelectorAll('input');

  var onFormInvalid = function (fildElement) {
    fildElement.addEventListener('invalid', function () {
      if (fildElement.validity.valid === false) {
        fildElement.style = 'outline: 3px red solid';
      }
    })
  }
  Array.from(inputElements).forEach(function (it) {
    onFormInvalid(it);
  });


  window.form = {
    disable: disableForm,
    enable: enableForm,
    insertAddress: insertValueAddress
  };
})();
