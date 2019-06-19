'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinListElement = document.querySelector('.map__pins');
  var mainFormElement = document.querySelector('.ad-form');
  var userAdressInputElement = document.querySelector('#address');

  var onHeadPinClick = function () {
    // Включаем поля форм и убираем классы неактивного состояния
    window.form.enabled();
    window.map.enabled();

    // Генерируем массив данных и добавляем метки на карту

    window.pin.add(window.data.get());

    // Удаляем обработчик, чтобы при повторном клике не добавлялись новые объекты
    headPinElement.removeEventListener('click', onHeadPinClick);
  };

  var headPinElement = mapElement.querySelector('.map__pin--main');

  headPinElement.addEventListener('click', onHeadPinClick);



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

  window.map = {
    disabled: function () {
      mapElement.classList.add('map--faded');
      mainFormElement.classList.add('ad-form--disabled');
    },

    enabled: function () {
      mapElement.classList.remove('map--faded');
      mainFormElement.classList.remove('ad-form--disabled');
    }
  }
}) ();


