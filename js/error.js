'use strict';

//  Модуль добавления ошибок
(function () {
  var page = document.querySelector('main');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');

  var createErrorAd = function () {
    var newErrorElement = templateErrorElement.cloneNode(true);
    var fragmentElement = document.createDocumentFragment();
    fragmentElement.appendChild(newErrorElement);
    page.appendChild(fragmentElement);
  }

  window.error = {
    createAd: createErrorAd,
  };
})();
