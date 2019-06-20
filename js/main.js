'use strict';

// Главный модуль
(function () {
  var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICE = [0, 1000, 5000, 10000];
  var mapPinListElement = document.querySelector('.map__pins');

  document.addEventListener('DOMContentLoaded', function () {
    window.form.disabled();
    window.map.disabled();
    // Метод инициализирует страницу
    window.map.init(function () {
      // Создает данные
      var newData = window.data.getData(TYPE_OG_HOUSING, mapPinListElement);
      // Активирует карту
      window.map.enabled();
      // Добавляет метки на карту
      window.map.add(newData, mapPinListElement, window.pin.create);
      // Активирует форму
      window.form.enabled();
      // Добавляет подстановку минимальной цены по типу жилья
      window.form.checkPrice(TYPE_OG_HOUSING, MIN_PRICE);
    });
  });
})();
