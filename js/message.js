'use strict';

//  Модуль отображения сообщений для пользователя
(function () {
  var ESC_KEYCODE = 27;

  var page = document.querySelector('main');

  // Метод создания сообщения об ошибке
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var createError = function (message) {
    var newErrorElement = templateErrorElement.cloneNode(true);
    var errorMessage = newErrorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    page.appendChild(newErrorElement);

    openBlockMessage(newErrorElement);
  };

  // Метод создания сообщения об успешной отправке формы
  var templateMessageElement = document.querySelector('#success').content.querySelector('.success');
  var createSuccess = function () {
    var newMessageElement = templateMessageElement.cloneNode(true);
    page.appendChild(newMessageElement);

    openBlockMessage(newMessageElement);
  }

  // Функция закрытия сообщения
  var openBlockMessage = function (element) {
    var onBlockErrorEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeBlockMessage(element);
      }
    };

    document.addEventListener('keydown', onBlockErrorEscPress);
    element.addEventListener('click', function () {
      closeBlockMessage(element);
    });

    var closeBlockMessage = function () {
      page.removeChild(element);
      document.removeEventListener('keydown', onBlockErrorEscPress);
    };
  };

  window.message = {
    getError: createError,
    getSuccess: createSuccess
  };
})();
