'use strict';

//  Модуль создания метки из шаблона
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (objetElement) {
    var newPinElement = templatePinElement.cloneNode(true);
    var pictureElement = newPinElement.querySelector('img');
    pictureElement.src = objetElement['author']['avatar'];
    pictureElement.alt = 'Здесь будет заголовок объявления';
    newPinElement.style = 'left:' + (objetElement['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (objetElement['location']['y'] - PIN_HEIGHT) + 'px;';

    return newPinElement;
  };

  window.pin = {
    create: createPin
  };
})();
