'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var MAP_TOP_BORDER = 130;
  var MAP_BOTTOM_BORDER = 630;

  var mainPinElement = document.querySelector('.map__pin--main');
  var mapPinListElement = document.querySelector('.map__pins');
  var userAdressInputElement = document.querySelector('#address');

  // Функция определения координат метки относительно краев карты
  var getCoordinateMainPin = function (pinWidth, pinHeight) {
    var mainPinCoordinate = mainPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    var x = 'x: ' + Math.floor(mainPinCoordinate.x - mapPinListElementCoordinate.x + pinWidth / 2);
    var y = 'y: ' + Math.floor(mainPinCoordinate.y - mapPinListElementCoordinate.y + pinHeight);
    userAdressInputElement.value = x + ', ' + y;
  };

  // Метод активации страницы при перемещении метки
  var goToActive = function (callBack, callBackData) {
    // В неактивном состоянии в поле адреса подставляются координаты центра метки
    getCoordinateMainPin(MAIN_PIN_WIDTH, MAIN_PIN_WIDTH / 2);
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
        getCoordinateMainPin(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        getCoordinateMainPin(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        callBackData();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      callBack();
    };
  };

  window.mainPin = {
    init: goToActive
  };
})();
