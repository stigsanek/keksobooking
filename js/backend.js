'use strict';

// Модуль загрузки данных с сервера
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var STATUS_CODE_SUCCESS = 200;
  var ONE_SECOND = 1000;
  var TIMEOUT = 10000;

  // Метод получения данных
  var downloadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / ONE_SECOND + 'секунд');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: downloadData
  };
})();
