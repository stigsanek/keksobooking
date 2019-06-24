'use strict';

//  Модуль создания метки, карточки и ошибки загрузки объявления
(function () {
  // Создание метки объявления
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (element) {
    var newPinElement = templatePinElement.cloneNode(true);
    var pictureElement = newPinElement.querySelector('img');
    pictureElement.src = element['author']['avatar'];
    pictureElement.alt = 'Здесь будет заголовок объявления';
    newPinElement.style = 'left:' + (element['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (element['location']['y'] - PIN_HEIGHT) + 'px;';

    return newPinElement;
  };

  window.pin = {
    createPin: createNewPin,
  };
})();
