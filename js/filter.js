'use strict';

// Модуль управления фильтром
(function () {
  var mapFormFilterElements = document.querySelector('.map__filters').querySelectorAll('select');

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    for (var i = 0; i < mapFormFilterElements.length; i++) {
      mapFormFilterElements[i].disabled = true;
    }
  };

  // Метод перевода фильтра в активное состояние
  var enableFilter = function () {
    for (var i = 0; i < mapFormFilterElements.length; i++) {
      mapFormFilterElements[i].disabled = false;
    }
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter
  };
})();
