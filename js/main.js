'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var HEAD_PIN_WIDTH = 65;
var HEAD_PIN_HEIGHT = 84;
var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var MIN_PRICE = [0, 1000, 5000, 10000];
var TIME_CHECK = ['12:00', '13:00', '14:00'];

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

// Валидация формы подачи объявления
//// Определение минимальной стоимости в зависимости от типа выбранного жилья
var priceInputElement = mainFormElement.querySelector('#price');
var typeSelectElement = mainFormElement.querySelector('#type');

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

      if (checkFields[i].value.length === 0) {
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
  };
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
