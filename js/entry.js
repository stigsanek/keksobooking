'use strict';

// Главный модуль
(function () {
  window.backend.load(window.data.set, window.message.getError);

  window.ad.init(window.map.insert);

  document.addEventListener('DOMContentLoaded', function () {
    window.map.disable();
    window.filter.disable();
    window.form.disable();
    // Активируем возможность отправки формы
    window.form.send(window.backend.upload, window.message.getSuccess, window.message.getError);

    window.mainPin.init(function () {
      // Активируем карту, форму и фильтр
      window.map.enable();
      window.filter.enable();
      window.form.enable();
    },
    // Добавляем данные на карту по mouseup
    function () {
      window.map.insert(window.data.get(), window.ad.createPin);
    },
     // Заполняем поле адреса по координатам метки
    function () {
      window.form.insertAddress(window.mainPin.getCoord);
    });
  });
})();
