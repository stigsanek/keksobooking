'use strict';

// Модуль управления фильтром
(function () {
  var mapFormFilterElements = document.querySelector('.map__filters').querySelectorAll('select');
  Array.from(mapFormFilterElements);

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    mapFormFilterElements.forEach(function (it) {
      it.disabled = true;
    });
  };

  // Метод перевода фильтра в активное состояние
  var enableFilter = function () {
    mapFormFilterElements.forEach(function (it) {
      it.disabled = false;
    });
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter
  };
})();
