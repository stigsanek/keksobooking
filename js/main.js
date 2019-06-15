'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapElement = document.querySelector('.map');
var mapPinListElement = document.querySelector('.map__pins');

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
    items[i]['location']['x'] = Math.floor(Math.random() * mapPinListElement.offsetWidth);
    items[i]['location']['y'] = getRandom(130, 630);
  }

  return items;
};

var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

//  Функция создания метки
var createMapPin = function (objetPin) {
  var newMapPinElement = templatePinElement.cloneNode(true);
  var pictureElement = newMapPinElement.querySelector('img');
  pictureElement.src = objetPin['author']['avatar'];
  pictureElement.alt = 'Здесь будет заголовок объявления';
  newMapPinElement.style = 'left:' + (objetPin['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (objetPin['location']['y'] - PIN_HEIGHT) + 'px;';

  return newMapPinElement;
};

//  Функция добавления меток в разметку
var addMapPin = function (objetsPins) {
  var fragmentElement = document.createDocumentFragment();

  for (var i = 0; i < objetsPins.length; i++) {
    var mapPinElement = createMapPin(objetsPins[i]);
    fragmentElement.appendChild(mapPinElement);
  }

  mapPinListElement.appendChild(fragmentElement);
};

var mapFormFilterElements = document.querySelector('.map__filters').querySelectorAll('select');
var formFieldsElements = document.querySelectorAll('fieldset');

// Функция добавления/удаления disabled всем полям форм
var changeAttributeDisabled = function (isDisabled) {
  if (isDisabled) {
    for (var i = 0; i < mapFormFilterElements.length; i++) {
      mapFormFilterElements[i].disabled = true;
    }
    for (i = 0; i < formFieldsElements.length; i++) {
      formFieldsElements[i].disabled = true;
    }
  }

  if (!isDisabled) {
    for (i = 0; i < mapFormFilterElements.length; i++) {
      mapFormFilterElements[i].disabled = false;
    }
    for (i = 0; i < formFieldsElements.length; i++) {
      formFieldsElements[i].disabled = false;
    }
  }
};

// Перевод страницы в неактивное состояние
changeAttributeDisabled(true);

// Активация страницы при клике на метку
var mainFormElement = document.querySelector('.ad-form');

var activatePage = function () {
  // Включаем поля форм и убираем классы неактивного состояния
  changeAttributeDisabled(false);
  mapElement.classList.remove('map--faded');
  mainFormElement.classList.remove('ad-form--disabled');

  // Генерируем массив данных и добавляем метки на карту
  var randomData = generateData();
  addMapPin(randomData);
};

var headPinElement = mapElement.querySelector('.map__pin--main');

headPinElement.addEventListener('click', function () {
  activatePage();
});
