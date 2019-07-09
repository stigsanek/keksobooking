'use strict';

// Модуль управления фильтром
(function () {
  var MAX_DATA = 5;
  var ANY_TYPE = 'any';
  var DEBOUNCE_INTERVAL = 500;

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var formFilterElement = document.querySelector('.map__filters');
  var selectFilterElements = formFilterElement.querySelectorAll('select');
  var housingTypeElement = formFilterElement.querySelector('#housing-type');
  var housingRoomsElement = formFilterElement.querySelector('#housing-rooms');
  var housingGuestsElement = formFilterElement.querySelector('#housing-guests');
  var housingPriceElement = formFilterElement.querySelector('#housing-price');

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    selectFilterElements.forEach(function (it) {
      it.disabled = true;
    });
    // Сброс значений фильтров
    resetFilter();
  };

  // Метод перевода фильтра в активное состояние
  var enableFilter = function () {
    selectFilterElements.forEach(function (it) {
      it.disabled = false;
    });
  };

  // Callback для удаления элементов
  var removeElement = null;
  var removeData = function (removeMethod) {
    removeElement = removeMethod;
  };

  // Метод фильтрации элементов
  var dataFlag = false;

  var getFilterData = function (data, insertMethod, insertElement) {
    var initialData = data.slice();
    var filterData = initialData;

    if (!dataFlag) {
      insertMethod(initialData.slice(0, MAX_DATA), insertElement);
      dataFlag = true;
    }

    var onFormFilterChange = doDebounce(function () {
      filterData = initialData.filter(function (it) {
        return doFiltereType(it) && doFilterPrice(it) && doFilterRooms(it) && doFilterGuests(it) && doFilterFeatures(it);
      });
      removeElement();
      insertMethod(filterData.slice(0, MAX_DATA), insertElement);
    });

    formFilterElement.addEventListener('change', onFormFilterChange);
  };

  // Функция фильтрации по типу жилья
  var doFiltereType = function (element) {
    if (housingTypeElement.value !== ANY_TYPE && element['offer']['type'] !== housingTypeElement.value) {
      return false;
    }
    return true;
  };

  // Функция фильтрации по цене
  var doFilterPrice = function (element) {
    if (housingPriceElement.value !== ANY_TYPE) {
      switch (housingPriceElement.value) {
        case 'low':
          if (element['offer']['price'] >= Price.LOW) {
            return false;
          }
          return true;
        case 'high':
          if (element['offer']['price'] <= Price.HIGH) {
            return false;
          }
          return true;
        case 'middle':
          if (element['offer']['price'] < Price.LOW || element['offer']['price'] > Price.HIGH) {
            return false;
          }
          return true;
      }
    }
    return true;
  };

  // Функция фильтрации по количеству комнат
  var doFilterRooms = function (element) {
    if (housingRoomsElement.value !== ANY_TYPE && element['offer']['rooms'] !== parseInt(housingRoomsElement.value, 10)) {
      return false;
    }
    return true;
  };

  // Функция фильтрации по количеству гостей
  var doFilterGuests = function (element) {
    if (housingGuestsElement.value !== ANY_TYPE && element['offer']['guests'] !== parseInt(housingGuestsElement.value, 10)) {
      return false;
    }
    return true;
  };

  // Функция фильтрации по удобствам
  var doFilterFeatures = function (element) {
    var featuresElements = formFilterElement.querySelectorAll('.map__checkbox:checked');
    var checkedFeatures = [];

    featuresElements.forEach(function (it) {
      checkedFeatures.push(it.value);
    });

    if (checkedFeatures.length > 0) {
      return checkedFeatures.every(function (it) {
        return element['offer']['features'].includes(it);
      });
    }
    return true;
  };

  // Функция устранения дребезга
  var doDebounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // Функция сброса всех значений формы фильтров
  var resetFilter = function () {
    formFilterElement.reset();
    dataFlag = false;
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter,
    initiate: removeData,
    employ: getFilterData
  };
})();
