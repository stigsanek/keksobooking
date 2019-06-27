'use strict';

// Главный модуль
(function () {
  var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICE = [0, 1000, 5000, 10000];

  document.addEventListener('DOMContentLoaded', function () {
    window.form.disabled();
    window.map.disabled();
    // Метод инициализирует страницу
    // Флаг проверки: активация карты/формы и добавление меток на карту
    // происходит только при первом перемещении метки
    var isDataAdd = false;
    window.map.init(function () {
      if (!isDataAdd) {
        window.map.enabled();
        window.form.enabled();
      }
      window.form.checkPrice(TYPE_OG_HOUSING, MIN_PRICE);
    },
    // Добавление данных на карту по mouseup
    function () {
      if (!isDataAdd) {
        // Получаем данные с сервера и добавляем метки похожих объявлений на карту
        window.load.get(window.map.add, window.error.createAd, window.pin.createPin);
        isDataAdd = true;
      }
    });
  });
})();
