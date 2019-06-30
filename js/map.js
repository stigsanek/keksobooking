'use strict';

// Модуль управления картой
(function () {

  var mapElement = document.querySelector('.map');
  var mapPinListElement = document.querySelector('.map__pins');

  // Метод перевода карты в неактивное состояние
  var disablePage = function () {
    mapElement.classList.add('map--faded');
  };

  // Метод перевода карты в активное состояние
  var enablePage = function () {
    mapElement.classList.remove('map--faded');
  };

  //  Метод добавления элементов на карту
  var mapElemnts = [];

  var insertElement = function (data, method) {
    var nodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();
      data.forEach(function (it) {
        nodeElement = method(it);
        fragmentElement.appendChild(nodeElement);
        mapElemnts.push(nodeElement);
      });
      mapPinListElement.appendChild(fragmentElement);
    } else {
      nodeElement = method(data);
      mapPinListElement.appendChild(nodeElement);
      mapElemnts.push(nodeElement);
    }
  };

  //  Метод удаления элементов с карты
  var deleteElement = function () {
    mapElemnts.forEach(function (it) {
      it.remove();
    });
    mapElemnts = [];
  };

  window.map = {
    disable: disablePage,
    enable: enablePage,
    delete: deleteElement,
    insert: insertElement,
  };
})();
