'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
    items[i]['location']['x'] = Math.floor(Math.random() * map.clientWidth);
    items[i]['location']['y'] = getRandom(130, 630);
  }

  return items;
};

//  Функция создания меток
var createMapPin = function (objets) {
  var templatePin = document.querySelector('#pin').content;
  var newPin = templatePin.querySelector('.map__pin');
  var picture = newPin.querySelector('img');
  var pins = [];

  for (var i = 0; i < objets.length; i++) {
    var mapPin = newPin.cloneNode(true);
    picture.src = objets[i]['author']['avatar'];
    picture.alt = 'Здесь будет заголовок объявления';
    mapPin.style = 'left:' + (objets[i]['location']['x'] - newPin.clientWidth / 2) + 'px; top:' + (objets[i]['location']['y'] - newPin.clientHeight) + 'px;';
    pins[i] = mapPin;
  }

  return pins;
};

//  Функция добавления меток в разметку
var addMapPin = function (objetsPins) {
  for (var i = 0; i < objetsPins.length; i++) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(objetsPins[i]);
    map.appendChild(fragment);
  }

  return;
};

// Генерируем массив данных и добавляем метки на карту
var randomData = generateData();
var mapPinElement = createMapPin(randomData);
addMapPin(mapPinElement);


