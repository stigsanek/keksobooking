'use strict';

// Модуль управления картой
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var MAP_TOP_BORDER = 130;
  var MAP_BOTTOM_BORDER = 630;

  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var mapPinListElement = document.querySelector('.map__pins');
  var userAdressInputElement = document.querySelector('#address');

  // Метод перевода карты в неактивное состояние
  var disabledPage = function () {
    mapElement.classList.add('map--faded');
    getCoordinateHeadPin(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
  };

  // Метод перевода карты в активное состояние
  var enabledPage = function () {
    mapElement.classList.remove('map--faded');
  };

  //  Метод добавления элементов на карту
  var addElement = function (objetElements, method) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < objetElements.length; i++) {
      var element = method(objetElements[i]);
      fragmentElement.appendChild(element);
    }
    mapPinListElement.appendChild(fragmentElement);
  };

  // Метод активации страницы по клику
  var goToActive = function (callBack, callBackData) {
    var doHundler = onMainPinMouseUp(callBack, callBackData);
    mainPinElement.addEventListener('mousedown', doHundler);
  };

  // Логика обработчика
  var onMainPinMouseUp = function (callBack, callBackData) {
    return function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clintX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var displacementX = mainPinElement.offsetLeft - shift.x;
        var displacementY = mainPinElement.offsetTop - shift.y;

        if ((displacementY > mapPinListElement.offsetTop + (MAP_TOP_BORDER - MAIN_PIN_HEIGHT)) && (displacementY < MAP_BOTTOM_BORDER - MAIN_PIN_HEIGHT)) {
          mainPinElement.style.top = displacementY + 'px';
        }

        if (displacementX > mapPinListElement.offsetLeft && displacementX < mapPinListElement.offsetLeft + mapPinListElement.offsetWidth - MAIN_PIN_WIDTH) {
          mainPinElement.style.left = displacementX + 'px';
        }
        getCoordinateHeadPin(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        getCoordinateHeadPin(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        callBackData();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      callBack();
    };
  };

  // Функция определения координат метки относительно краев карты
  var getCoordinateHeadPin = function (pinWidth, pinHeight) {
    var mainPinCoordinate = mainPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    userAdressInputElement.value = 'x: ' + Math.floor(mainPinCoordinate.x - mapPinListElementCoordinate.x + pinWidth / 2) + ', ' + 'y: ' + Math.floor(mainPinCoordinate.y - mapPinListElementCoordinate.y + pinHeight);
  };

  window.map = {
    disabled: disabledPage,
    enabled: enabledPage,
    add: addElement,
    init: goToActive
  };
})();
