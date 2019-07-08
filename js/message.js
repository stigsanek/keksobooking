'use strict';

//  Модуль отображения сообщений для пользователя
(function () {
  var ESC_KEYCODE = 27;

  var mainPageElement = document.querySelector('main');

  // Метод создания сообщения об ошибке
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var createError = function (message) {
    var newErrorElement = templateErrorElement.cloneNode(true);
    var errorMessageElement = newErrorElement.querySelector('.error__message');
    errorMessageElement.textContent = message;
    mainPageElement.appendChild(newErrorElement);

    openBlockMessage(newErrorElement);
  };

  // Метод создания сообщения об успешной отправке формы
  var templateMessageElement = document.querySelector('#success').content.querySelector('.success');
  var createSuccess = function () {
    var newMessageElement = templateMessageElement.cloneNode(true);
    mainPageElement.appendChild(newMessageElement);

    openBlockMessage(newMessageElement);
  };

  // Функция закрытия сообщения
  var openBlockMessage = function (element) {
    var onBlockEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeBlockMessage(element);
      }
    };

    document.addEventListener('keydown', onBlockEscPress);
    element.addEventListener('click', function () {
      closeBlockMessage(element);
    });

    var closeBlockMessage = function () {
      mainPageElement.removeChild(element);
      document.removeEventListener('keydown', onBlockEscPress);
    };
  };

  window.message = {
    getError: createError,
    getSuccess: createSuccess
  };
})();
