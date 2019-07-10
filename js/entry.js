'use strict';

// Главный модуль
(function () {
  // Загружаем данные
  window.backend.download(window.data.set, window.message.getError);
  // Передаем модулю объявления метод добавления элементов на карту и метод закрытия карточки по ESC
  window.ad.initiate(window.map.insert, window.util.pressEsc);
  // Передаем модулю фильтра метод удаления элементов с карты
  window.filter.initiate(window.map.clear);
  // Передаем модулю создания сообщений метод метод закрытия сообщения по ESC
  window.message.initiate(window.util.pressEsc);

  document.addEventListener('DOMContentLoaded', function () {
    window.map.disable();
    window.filter.disable();
    window.form.disable();

    window.mainPin.initiate(function () {
      // Активируем карту, форму и фильтр
      window.map.enable();
      window.filter.enable();
      window.form.enable();
      // Вызываем метод отправки данных формы
      window.form.send(window.backend.upload, window.message.getSuccess, window.message.getError, disablePage);
    },
    // Добавляем данные на карту по mouseup
    function () {
      window.filter.employ(window.data.get(), window.map.insert, window.ad.createPin, window.util.makeDebounce);
    },
    // Заполняем поле адреса по координатам метки
    function () {
      window.form.insertAddress(window.mainPin.getCoord);
    });
  });

  // Функция перевода страницы в неактивное состояние после сброса/отправки формы
  var disablePage = function () {
    // Удаляем элементы с карты
    window.map.clear();
    // Переводим карту в неактивное состояние
    window.map.disable();
    // Переводим фильтры в неактивное состояние
    window.filter.disable();
    // Переводим форму в неактивное состояние
    window.form.disable();
    // Сбрасываем положение метки и заполняем поле адреса
    window.mainPin.reset();
    window.form.insertAddress(window.mainPin.getCoord);
  };
})();
