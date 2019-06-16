'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var HEAD_PIN_WIDTH = 65;
var HEAD_PIN_HEIGHT = 84;
var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var MIN_PRICE = [0, 1000, 5000, 10000];

var mapElement = document.querySelector('.map');
var mapPinListElement = document.querySelector('.map__pins');

//  Функция генерации случайных данных
var generateData = function () {
  var items = [];

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
    items[i]['offer']['type'] = TYPE_OG_HOUSING[Math.floor(Math.random() * TYPE_OG_HOUSING.length)];
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

// Валидация поля с ценой в зависимости от типа жилья
var priceInputElement = mainFormElement.querySelector('#price');
var typeSelectElement = mainFormElement.querySelector('#type');

var onTypeSelectChange = function (typeSelect, priceInput) {
  typeSelectElement.addEventListener('change', function () {
    if (typeSelectElement.value === typeSelect) {
      priceInputElement.min = priceInput;
      priceInputElement.placeholder = priceInput;
    }
  });
};

for (var i = 0; i < TYPE_OG_HOUSING.length; i++) {
  onTypeSelectChange(TYPE_OG_HOUSING[i], MIN_PRICE[i]);
}

// Валидация полей заезда/выезда
var timeinSelectElement = mainFormElement.querySelector('#timein');
var timeoutSelectElement = mainFormElement.querySelector('#timeout');

var validateTimeSelect = function (timeInSelect, timeOutSelect) {
  if (timeInSelect.value === '12:00') {
    timeOutSelect.value = '12:00';
  }
  if (timeInSelect.value === '13:00') {
    timeOutSelect.value = '13:00';
  }
  if (timeInSelect.value === '14:00') {
    timeOutSelect.value = '14:00';
  }
};

timeinSelectElement.addEventListener('change', function () {
  validateTimeSelect(timeinSelectElement, timeoutSelectElement);
});

timeoutSelectElement.addEventListener('change', function () {
  validateTimeSelect(timeoutSelectElement, timeinSelectElement);
});
