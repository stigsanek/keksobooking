'use strict';

(function () {
  var HEAD_PIN_WIDTH = 65;
  var HEAD_PIN_HEIGHT = 84;

  var mapElement = document.querySelector('.map');
  var mapPinListElement = document.querySelector('.map__pins');
  var headPinElement = mapElement.querySelector('.map__pin--main');
  var mainFormElement = document.querySelector('.ad-form');
  var userAdressInputElement = document.querySelector('#address');

  //  Функция добавления пинов в разметку
  var addPin = function (objetsPins) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < objetsPins.length; i++) {
      var mapPinElement = window.pin.create(objetsPins[i]);
      fragmentElement.appendChild(mapPinElement);
    }
    mapPinListElement.appendChild(fragmentElement);
  };

  // Функция активации страницы
  var onHeadPinClick = function () {
    window.form.enabled();
    window.map.enabled();
    addPin(window.data.get());
    getCoordinateHeadPin(HEAD_PIN_WIDTH, HEAD_PIN_HEIGHT);
    // Удаляем обработчик, чтобы при повторном клике не добавлялись новые объекты
    headPinElement.removeEventListener('mouseup', onHeadPinClick);
  };

  var activatePage = function () {
    headPinElement.addEventListener('mouseup', onHeadPinClick);
  };

  // Функция определения координат метки относительно краев карты
  var getCoordinateHeadPin = function (pinWidth, pinHeight) {
    var headPinCoordinate = headPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    userAdressInputElement.value = Math.floor(headPinCoordinate.x - mapPinListElementCoordinate.x + pinWidth / 2) + ', ' + Math.floor(headPinCoordinate.y - mapPinListElementCoordinate.y + pinHeight);
  };

  window.map = {
    disabled: function () {
      mapElement.classList.add('map--faded');
      mainFormElement.classList.add('ad-form--disabled');
      getCoordinateHeadPin(HEAD_PIN_WIDTH, HEAD_PIN_WIDTH / 2);
    },

    enabled: function () {
      mapElement.classList.remove('map--faded');
      mainFormElement.classList.remove('ad-form--disabled');
    },

    activate: activatePage
  };
})();


