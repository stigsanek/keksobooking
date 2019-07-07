'use strict';

// Модуль управления фильтром
(function () {
  var MAX_DATA = 5;
  var ALL_TYPE_HOUSING = 'any';

  var mapFormFilterElements = document.querySelector('.map__filters').querySelectorAll('select');

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    mapFormFilterElements.forEach(function (it) {
      it.disabled = true;
    });
  };

  // Метод перевода фильтра в активное состояние
  var enableFilter = function () {
    mapFormFilterElements.forEach(function (it) {
      it.disabled = false;
    });
  };

  // Callback для удаления элементов
  var deleteElement = null;
  var deleteData = function (deleteMethod) {
    deleteElement = deleteMethod;
  };

  // Метод фильтрации элементов
  var housingTypeElement = document.querySelector('#housing-type');
  var dataFlag = false;

  var getFilterData = function (data, insertMethod, insertElement) {
    var filterArray = [];
    if (!dataFlag) {
      insertMethod(data.slice(0, MAX_DATA), insertElement);
      dataFlag = true;
    }

    housingTypeElement.addEventListener('change', function (evt) {
      deleteElement();

      if (housingTypeElement.value === ALL_TYPE_HOUSING) {
        insertMethod(data.slice(0, MAX_DATA), insertElement);
      }
      if (housingTypeElement.value === evt.target.value) {
        filterArray = data.filter(function (it) {
          return it['offer']['type'] === evt.target.value;
        });
        insertMethod(filterArray.slice(0, MAX_DATA), insertElement);
      }
    });
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter,
    initiate: deleteData,
    employ: getFilterData
  };
})();
