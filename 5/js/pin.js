'use strict';

//  Модуль создания метки из шаблона
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    create: function (objetPin) {
      var newMapPinElement = templatePinElement.cloneNode(true);
      var pictureElement = newMapPinElement.querySelector('img');
      pictureElement.src = objetPin['author']['avatar'];
      pictureElement.alt = 'Здесь будет заголовок объявления';
      newMapPinElement.style = 'left:' + (objetPin['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (objetPin['location']['y'] - PIN_HEIGHT) + 'px;';

      return newMapPinElement;
    }
  };
})();
