'use strict';

// Модуль валидации формы подачи объявления
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_SIZE = 70;

  var typeHousePriceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var roomCapacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var mainFormElement = document.querySelector('.ad-form');
  var formFieldsElements = mainFormElement.querySelectorAll('fieldset');

  // Метод перевода формы в неактивное состояние
  var disableForm = function () {
    mainFormElement.classList.add('ad-form--disabled');
    formFieldsElements.forEach(function (it) {
      it.disabled = true;
    });
    // Сброс значений всех полей
    resetForm();
  };

  // Метод перевода формы в активное состояние
  var enableForm = function () {
    mainFormElement.classList.remove('ad-form--disabled');
    formFieldsElements.forEach(function (it) {
      it.disabled = false;
    });
  };

  // Метод заполнения поле адреса
  var userAddressInputElement = mainFormElement.querySelector('#address');
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
  var timeInSelectElement = mainFormElement.querySelector('#timein');
  var timeOutSelectElement = mainFormElement.querySelector('#timeout');

  var onTimeInChange = function () {
    timeOutSelectElement.value = timeInSelectElement.value;
  };
  var onTimeOutChange = function () {
    timeInSelectElement.value = timeOutSelectElement.value;
  };

  timeInSelectElement.addEventListener('change', onTimeInChange);
  timeOutSelectElement.addEventListener('change', onTimeOutChange);

  // Синхронизация количества гостей от колиества комнат
  var roomSelectElement = mainFormElement.querySelector('#room_number');
  var capacityOptionElements = mainFormElement.querySelector('#capacity').querySelectorAll('option');

  var onRoomSelectChange = function () {
    capacityOptionElements.forEach(function (option) {
      option.disabled = true;
      option.selected = false;

      if (roomCapacityMap[roomSelectElement.value].indexOf(option.value) > -1) {
        option.disabled = false;
        option.selected = true;
      }
    });
  };

  roomSelectElement.addEventListener('change', onRoomSelectChange);

  // Функция загрузки изображений в форму
  var addPicture = function (choser, image, container) {
    var newFiles = Array.from(choser.files);
    newFiles.forEach(function (element) {
      var fileName = element.name.toLowerCase();
      var fileMatchEnd = function (it) {
        return fileName.endsWith(it);
      };

      var matches = FILE_TYPE.some(fileMatchEnd);

      if (matches) {
        var readerPicture = new FileReader();
        if (container) {
          image.remove();
          var onPictureLoad = function () {
            var newBlockElement = image.cloneNode(true);
            var newPictureElement = document.createElement('img');
            newPictureElement.width = PICTURE_SIZE;
            newPictureElement.height = PICTURE_SIZE;
            newPictureElement.src = readerPicture.result;
            newBlockElement.appendChild(newPictureElement);
            container.appendChild(newBlockElement);
          }
          readerPicture.addEventListener('load', onPictureLoad);
        } else {
          var onAvatarLoad = function () {
            image.src = readerPicture.result;
          }
          readerPicture.addEventListener('load', onAvatarLoad);
        }
        readerPicture.readAsDataURL(element);
      }
    });
  };

  // Загрузка аватара
  var avatarChoserElement = mainFormElement.querySelector('#avatar');
  var avatarImageElement = mainFormElement.querySelector('.ad-form-header__preview').querySelector('img');

  avatarChoserElement.addEventListener('change', function () {
    addPicture(avatarChoserElement, avatarImageElement);
  });

  // Загрузка фотографий жилья
  var pictureChoserElement = mainFormElement.querySelector('#images');
  var picturesContainerElement = mainFormElement.querySelector('.ad-form__photo-container');
  var pictureBlockElement = mainFormElement.querySelector('.ad-form__photo');

  pictureChoserElement.addEventListener('change', function () {
    addPicture(pictureChoserElement, pictureBlockElement, picturesContainerElement);
  });

  // Метод отправки данных формы
  var saveData = function (requestMethod, onSuccsess, onError, callbackReset) {
    var onFormSubmit = sendData(requestMethod, onSuccsess, onError, callbackReset);
    mainFormElement.addEventListener('submit', onFormSubmit);
  };

  // Функция сброса значений всех полей формы
  var resetForm = function () {
    mainFormElement.reset();
    onTypeSelectChange();
    onRoomSelectChange();
  };

  // Функция отправки данных
  var sendData = function (requestMethod, onSuccsess, onError, callbackReset) {
    return function (evt) {
      requestMethod(new FormData(mainFormElement), onSuccsess, onError);
      callbackReset();
      evt.preventDefault();
    };
  };

  // Метод сброса формы по нажатию на reset
  var resetBtnElement = mainFormElement.querySelector('.ad-form__reset');

  var resetValue = function (callbackReset) {
    var onFormReset = resetData(callbackReset);
    resetBtnElement.addEventListener('click', onFormReset);
  };

  // Функция сброса
  var resetData = function (callbackReset) {
    return function (evt) {
      evt.preventDefault();
      callbackReset();
    };
  };

  window.form = {
    disable: disableForm,
    enable: enableForm,
    insertAddress: insertValueAddress,
    send: saveData,
    reset: resetValue
  };
})();
