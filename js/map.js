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
  var mapInsertElemnts = [];

  var insertElement = function (data, method) {
    var nodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();
      data.forEach(function (it) {
        nodeElement = method(it);
        fragmentElement.appendChild(nodeElement);
        mapInsertElemnts.push(nodeElement);
      });
      mapPinListElement.appendChild(fragmentElement);
    } else {
      nodeElement = method(data);
      mapPinListElement.appendChild(nodeElement);
      mapInsertElemnts.push(nodeElement);

      // При открытии новой карточки старая удаляется
      var index = mapInsertElemnts.indexOf(nodeElement);
      if (index !== -1) {
        mapInsertElemnts.splice(index, 1);
      }
    }
  };

  //  Метод удаления элементов с карты
  var deleteElement = function () {
    mapInsertElemnts.forEach(function (it) {
      it.remove();
    });
    mapInsertElemnts = [];
  };

  window.map = {
    disable: disablePage,
    enable: enablePage,
    delete: deleteElement,
    insert: insertElement,
  };
})();
