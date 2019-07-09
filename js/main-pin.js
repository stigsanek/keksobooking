'use strict';

(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 84
  };

  var MapBorder = {
    TOP: 130,
    BOTTOM: 630
  };

  var mapPinListElement = document.querySelector('.map__pins');
  var mainPinElement = mapPinListElement.querySelector('.map__pin--main');

  // Метод сброса положения метки в исходное состояние
  var startPinCoordinate = mainPinElement.getBoundingClientRect();
  var startPinListElementCoordinate = mapPinListElement.getBoundingClientRect();

  var resetCoordinate = function () {
    pageAciveFlag = false;
    mainPinElement.style.left = startPinCoordinate.left - startPinListElementCoordinate.left + 'px';
    mainPinElement.style.top = startPinCoordinate.top - startPinListElementCoordinate.top + 'px';
  };

  // Метод определения координат метки относительно краев карты
  var pageAciveFlag = false;
  var getCoordinateMainPin = function () {
    var mainPinCoordinate = mainPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    var coordX = Math.floor(mainPinCoordinate.left - mapPinListElementCoordinate.left + MainPin.WIDTH / 2);
    // Если страница не активна, адресом будет середина метки
    if (!pageAciveFlag) {
      var coordY = Math.floor(mainPinCoordinate.top - mapPinListElementCoordinate.top + MainPin.WIDTH / 2);
      pageAciveFlag = true;
    } else {
      coordY = Math.floor(mainPinCoordinate.top - mapPinListElementCoordinate.top + MainPin.HEIGHT);
    }
    return coordX + ', ' + coordY;
  };

  // Метод активации страницы при перемещении метки
  var goToActive = function (callBack, callBackData, callbackCoord) {
    // В неактивном состоянии в поле адреса подставляются координаты центра метки
    callbackCoord();
    var onMainPinMove = onMainPinMouseUp(callBack, callBackData, callbackCoord);
    mainPinElement.addEventListener('mousedown', onMainPinMove);
  };

  // Логика обработчика перемещения метки
  var onMainPinMouseUp = function (callBack, callBackData, callbackCoord) {
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

        if ((displacementY >= mapPinListElement.offsetTop + (MapBorder.TOP - MainPin.HEIGHT)) && (displacementY <= MapBorder.BOTTOM - MainPin.HEIGHT)) {
          mainPinElement.style.top = displacementY + 'px';
        }

        if (displacementX >= mapPinListElement.offsetLeft && displacementX <= mapPinListElement.offsetLeft + mapPinListElement.offsetWidth - MainPin.WIDTH) {
          mainPinElement.style.left = displacementX + 'px';
        }
        callbackCoord();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        callbackCoord();
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
    initiate: goToActive,
    getCoord: getCoordinateMainPin,
    reset: resetCoordinate
  };
})();
