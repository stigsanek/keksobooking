'use strict';

//  Модуль добавления ошибок
(function () {
  var ESC_KEYCODE = 27;

  var page = document.querySelector('main');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

  var createErrorAd = function (message) {
    var newErrorElement = templateErrorElement.cloneNode(true);
    var errorMessage = newErrorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    var fragmentElement = document.createDocumentFragment();
    fragmentElement.appendChild(newErrorElement);
    page.appendChild(fragmentElement);

    openBlockMessage();
  };

  // Функция закрытия сообщения об ошибке
  var openBlockMessage = function () {
    var onBlockErrorEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeBlockMessage();
      }
    };

    document.addEventListener('keydown', onBlockErrorEscPress);
    var blockErrorElement = document.querySelector('.error');
    blockErrorElement.addEventListener('click', function () {
      closeBlockMessage();
    });

    var closeBlockMessage = function () {
      page.removeChild(blockErrorElement);
      document.removeEventListener('keydown', onBlockErrorEscPress);
    };
  };

  window.error = {
    createAd: createErrorAd,
  };
})();