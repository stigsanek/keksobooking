'use strict';

//  Функция создания метки
(function () {
  var mapPinListElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createMapPin = function (objetPin) {
    var newMapPinElement = templatePinElement.cloneNode(true);
    var pictureElement = newMapPinElement.querySelector('img');
    pictureElement.src = objetPin['author']['avatar'];
    pictureElement.alt = 'Здесь будет заголовок объявления';
    newMapPinElement.style = 'left:' + (objetPin['location']['x'] - PIN_WIDTH / 2) + 'px; top:' + (objetPin['location']['y'] - PIN_HEIGHT) + 'px;';

    return newMapPinElement;
  };

  //  Функция добавления меток в разметку
  window.pin = {
    add: function (objetsPins) {
      var fragmentElement = document.createDocumentFragment();

      for (var i = 0; i < objetsPins.length; i++) {
        var mapPinElement = createMapPin(objetsPins[i]);
        fragmentElement.appendChild(mapPinElement);
      }

      mapPinListElement.appendChild(fragmentElement);
    }
  }
}) ();
