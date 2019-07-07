'use strict';

// Модуль валидации формы подачи объявления
(function () {
  var typeHousePriceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var roomCapacityMap = {
    '1': {
      value: 1,
      items: [2]
    },
    '2': {
      value: 2,
      items: [1, 2]
    },
    '3': {
      value: 3,
      items: [0, 1, 2]
    },
    '100': {
      value: 0,
      items: [3]
    }
  };

  var mainFormElement = document.querySelector('.ad-form');
  var formFieldsElements = document.querySelectorAll('fieldset');

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
    onRoomforCapacityChange();
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
    timeoutSelectElement.value = timeinSelectElement.value;
  };
  var onTimeOutChange = function () {
    timeinSelectElement.value = timeoutSelectElement.value;
  };

  timeinSelectElement.addEventListener('change', onTimeInChange);
  timeoutSelectElement.addEventListener('change', onTimeOutChange);

  // Синхронизация количества гостей от колиества комнат
  var roomSelectElement = document.querySelector('#room_number');
  var capcitySelectElement = document.querySelector('#capacity');
  var capacityOptionElements = capcitySelectElement.querySelectorAll('option');

  var onRoomforCapacityChange = function () {
    disableOption();
    roomCapacityMap[roomSelectElement.value].items.forEach(function (it) {
      capacityOptionElements[it].disabled = false;
    });
    capcitySelectElement.value = roomCapacityMap[roomSelectElement.value].value;
  };

  var disableOption = function () {
    capacityOptionElements.forEach(function (it) {
      it.disabled = true;
      if (it.selected === true) {
        it.removeAttribute('selected');
      }
    });
  };

  roomSelectElement.addEventListener('change', onRoomforCapacityChange);

  // Метод отправки данных формы
  var saveData = function (requestMethod, onSuccsess, onError) {
    mainFormElement.addEventListener('submit', function (evt) {
      requestMethod(new FormData(mainFormElement), onSuccsess, onError);
      evt.preventDefault();
    });
  };

  window.form = {
    disable: disableForm,
    enable: enableForm,
    insertAddress: insertValueAddress,
    send: saveData
  };
})();
