'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var HEAD_PIN_WIDTH = 65;
var HEAD_PIN_HEIGHT = 84;

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

var onHeadPinClick = function () {
  // Включаем поля форм и убираем классы неактивного состояния
  changeAttributeDisabled(false);
  mapElement.classList.remove('map--faded');
  mainFormElement.classList.remove('ad-form--disabled');

  // Генерируем массив данных и добавляем метки на карту
  var randomData = generateData();
  addMapPin(randomData);

  // Удаляем обработчик, чтобы при повторном клике не добавлялись новые объекты
  headPinElement.removeEventListener('click', onHeadPinClick);
};

var headPinElement = mapElement.querySelector('.map__pin--main');

headPinElement.addEventListener('click', onHeadPinClick);

var userAdressInputElement = document.querySelector('#address');

// Функция определения координат метки относительно краев карты
var getCoordinateHeadPin = function (pinWidth, pinHeight) {
  var headPinCoordinate = headPinElement.getBoundingClientRect();
  var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
  userAdressInputElement.value = Math.floor(headPinCoordinate.x - mapPinListElementCoordinate.x + pinWidth / 2) + ', ' + Math.floor(headPinCoordinate.y - mapPinListElementCoordinate.y + pinHeight);
};

// Заполнение адреса для неактивного состояния
// В неактивном состоянии метка круглая, поэтому считаем что ширина равна длине
getCoordinateHeadPin(HEAD_PIN_WIDTH, HEAD_PIN_WIDTH / 2);

// Заполнение адреса по событию mouseup
// Адрес корректируется на координаты острия метки
headPinElement.addEventListener('mouseup', function () {
  getCoordinateHeadPin(HEAD_PIN_WIDTH, HEAD_PIN_HEIGHT);
});

// Валидация формы
var priceInputElement = document.querySelector('#price');
var typeSelectElement = document.querySelector('#type');

var validatePraceInput = function () {
  if (typeSelectElement.value === 'bungalo') {
    priceInputElement.min = 0;
    priceInputElement.placeholder = 0;
  }
  if (typeSelectElement.value === 'flat') {
    priceInputElement.min = 1000;
    priceInputElement.placeholder = 1000;
  }
  if (typeSelectElement.value === 'house') {
    priceInputElement.min = 5000;
    priceInputElement.placeholder = 5000;
  }
  if (typeSelectElement.value === 'palace') {
    priceInputElement.min = 10000;
    priceInputElement.placeholder = 10000;
  }
};

typeSelectElement.addEventListener('change', validatePraceInput);
