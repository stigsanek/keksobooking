'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;

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
  var addElement = function (objetElements, parentElement, method) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < objetElements.length; i++) {
      var element = method(objetElements[i]);
      fragmentElement.appendChild(element);
    }
    parentElement.appendChild(fragmentElement);
  };

  // Метод активации страницы по клику
  var goToActive = function (callBack) {
    var doHundler = onMainPinMouseUp(callBack);
    mainPinElement.addEventListener('mouseup', doHundler);
  };

  // Логика обработчика
  var onMainPinMouseUp = function (callBack) {
    return function () {
      getCoordinateHeadPin(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
      callBack();
    };
  };

  // Функция определения координат метки относительно краев карты
  var getCoordinateHeadPin = function (pinWidth, pinHeight) {
    var mainPinCoordinate = mainPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    userAdressInputElement.value = Math.floor(mainPinCoordinate.x - mapPinListElementCoordinate.x + pinWidth / 2) + ', ' + Math.floor(mainPinCoordinate.y - mapPinListElementCoordinate.y + pinHeight);
  };

  window.map = {
    disabled: disabledPage,
    enabled: enabledPage,
    add: addElement,
    init: goToActive
  };
})();


