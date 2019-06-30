'use strict';

// Главный модуль
(function () {
  window.backend.load(window.data.set, window.error.createAd);

  window.ad.init(window.map.insert);

  document.addEventListener('DOMContentLoaded', function () {
    window.map.disable();
    window.filter.disable();
    window.form.disable();

    window.mainPin.init(function () {
      // Активируем карту, форму и фильтр
      window.map.enable();
      window.filter.enable();
      window.form.enable();
    },
    // Добавляем данные на карту по mouseup
    function () {
      window.map.insert(window.data.get(), window.ad.createPin);
    });
  });
})();
