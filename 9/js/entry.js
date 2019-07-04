'use strict';

// Главный модуль
(function () {
  // Загружаем данные
  window.backend.load(window.data.set, window.message.getError);
  // Передаем модулю объявления метод добавления элементов на карту
  window.ad.init(window.map.insert);
  // Передаем модулю фильтра метод удаления элементов с карты
  window.filter.init(window.map.delete);

  document.addEventListener('DOMContentLoaded', function () {
    window.map.disable();
    window.filter.disable();
    window.form.disable();

    window.mainPin.init(function () {
      // Активируем карту, форму и фильтр
      window.map.enable();
      window.filter.enable();
      window.form.enable();
      window.form.send(window.backend.upload, window.message.getSuccess, window.message.getError);
    },
    // Добавляем данные на карту по mouseup
    function () {
      window.filter.apply(window.data.get(), window.map.insert, window.ad.createPin);
    },
    // Заполняем поле адреса по координатам метки
    function () {
      window.form.insertAddress(window.mainPin.getCoord);
    });
  });
})();
