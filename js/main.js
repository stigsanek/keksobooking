'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
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

//  Функция создания метки
var createMapPin = function (objet) {
  var newPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var picture = newPin.querySelector('img');
  var mapPin = newPin.cloneNode(true);
  picture.src = objet['author']['avatar'];
  picture.alt = 'Здесь будет заголовок объявления';
  mapPin.style = 'left:' + (objet['location']['x'] - newPin.offsetWidth / 2) + 'px; top:' + (objet['location']['y'] - newPin.offsetHeight) + 'px;';

  return mapPin;
};

//  Функция добавления меток в разметку
var addMapPin = function (objetsPins) {
  for (var i = 0; i < objetsPins.length; i++) {
    var fragment = document.createDocumentFragment();
    var mapPinsElement = createMapPin(objetsPins[i]);
    fragment.appendChild(mapPinsElement);
    mapPinsList.appendChild(fragment);
  }

  return;
};

// Генерируем массив данных и добавляем метки на карту
var randomData = generateData();
addMapPin(randomData);


