'use strict';

// Перевод страницы в неактивное состояние
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    window.form.disabled();
    window.map.disabled();
  });
}) ();



