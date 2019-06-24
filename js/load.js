'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  // Метод получения данных.
  // Поскольку модуль добавления элементов на страницу универсален
  // Последними 2 парамтерами передаем "Место добавления" и "Метод: что добавляем"
  var downloadData = function (onSuccess, onError, parentElement, method) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response, parentElement, method);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    get: downloadData
  };
})();
