'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');

//  Функция генерации случайных данных
var generateData = function () {
  var items = [];
  var offerType = ['palace', 'flat', 'house', 'bungalo'];

  var getRandom = function (min, max) {
    var random = Math.floor(min + Math.random() * (max - min));
    return random;
  };

  for (var i = 0; i < 8; i++) {
    items[i] = {
      'author': {
        'avatar': ''
      },
      'offer': {
        'type': ''
      },
      'location': {
        'x': '',
        'y': ''
      }
    };

    items[i]['author']['avatar'] = 'img/avatars/user0' + (i + 1) + '.png';
    items[i]['offer']['type'] = offerType[Math.floor(Math.random() * offerType.length)];
    items[i]['location']['x'] = Math.floor(Math.random() * mapPinsList.offsetWidth);
    items[i]['location']['y'] = getRandom(130, 630);
  }

  return items;
};

var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

//  Функция создания метки
var createMapPin = function (objet) {
  var mapPin = newPin.cloneNode(true);
  var picture = mapPin.querySelector('img');
  picture.src = objet['author']['avatar'];
  picture.alt = 'Здесь будет заголовок объявления';
  mapPin.style = 'left:' + (objet['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (objet['location']['y'] - PIN_HEIGHT) + 'px;';

  return mapPin;
};

//  Функция добавления меток в разметку
var addMapPin = function (objetsPins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < objetsPins.length; i++) {
    var mapPinsElement = createMapPin(objetsPins[i]);
    fragment.appendChild(mapPinsElement);
  }

  mapPinsList.appendChild(fragment);
};

var mapFormFilterFields = document.querySelector('.map__filters').querySelectorAll('select');
var formFields = document.querySelectorAll('fieldset');

// Функция добавления/удаления disabled всем полям форм
var changeAttributeDisabled = function (isDisabled) {
  if (isDisabled) {
    for (var i = 0; i < mapFormFilterFields.length; i++) {
      mapFormFilterFields[i].disabled = true;
    }
    for (i = 0; i < formFields.length; i++) {
      formFields[i].disabled = true;
    }
  }

  if (!isDisabled) {
    for (i = 0; i < mapFormFilterFields.length; i++) {
      mapFormFilterFields[i].disabled = false;
    }
    for (i = 0; i < formFields.length; i++) {
      formFields[i].disabled = false;
    }
  }
};

// Перевод страницы в неактивное состояние
changeAttributeDisabled(true);

// Активация страницы при клике на метку
var mainForm = document.querySelector('.ad-form');

var activatePage = function () {
  // Включаем поля форм и убираем классы неактивного состояния
  changeAttributeDisabled(false);
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');

  // Генерируем массив данных и добавляем метки на карту
  var randomData = generateData();
  addMapPin(randomData);
};

var headPin = map.querySelector('.map__pin--main');

headPin.addEventListener('click', function () {
  activatePage();
});
