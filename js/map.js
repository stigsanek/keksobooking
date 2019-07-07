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

  // Метод добавления элементов на карту
  // Массив добавляемых элементов записывается в пустой массив для простоты удаления элементов с карты
  var mapListElemnts = [];
  // Если добавляется один элемент, то он записывается в переменную
  var mapItemElement = null;

  var insertElement = function (data, method) {
    var nodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();
      data.forEach(function (it) {
        nodeElement = method(it);
        fragmentElement.appendChild(nodeElement);
        mapListElemnts.push(nodeElement);
      });
      mapPinListElement.appendChild(fragmentElement);
    } else {
      nodeElement = method(data);
      mapItemElement = nodeElement;
      mapPinListElement.insertAdjacentElement('afterend', nodeElement);
    }
  };

  //  Метод удаления элементов с карты
  var deleteElement = function () {
    mapListElemnts.forEach(function (it) {
      it.remove();
    });
    mapListElemnts = [];

    if (mapItemElement) {
      mapItemElement.remove();
      mapItemElement = null;
    }
  };

  window.map = {
    disable: disablePage,
    enable: enablePage,
    delete: deleteElement,
    insert: insertElement,
  };
})();