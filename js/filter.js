'use strict';

// Модуль управления фильтром
(function () {
  var MAX_DATA = 5;
  var ANY_TYPE = 'any';

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var mapFilter = document.querySelector('.map__filters');
  var mapFormFilterElements = mapFilter.querySelectorAll('select');

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    mapFormFilterElements.forEach(function (it) {
      it.disabled = true;
    });
    // Сброс значений фильтров
    resetFilter();
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
  var formFilter = document.querySelector('.map__filters');
  var housingTypeElement = formFilter.querySelector('#housing-type');
  var housingRoomsElement = formFilter.querySelector('#housing-rooms');
  var housingGuestsElement = formFilter.querySelector('#housing-guests');
  var housingPriceElement = formFilter.querySelector('#housing-price');
  var dataFlag = false;

  var getFilterData = function (data, insertMethod, insertElement) {
    var initialData = data.slice();
    var filterData = initialData;

    if (!dataFlag) {
      insertMethod(initialData.slice(0, MAX_DATA), insertElement);
      dataFlag = true;
    }

    var onFormFilter = function () {
      filterData = initialData.filter(function (it) {
        return doFiltereType(it) && doFilterPrice(it) && doFilterRooms(it) && doFilterGuests(it) && doFilterFeatures(it);
      });
      deleteElement();
      insertMethod(filterData.slice(0, MAX_DATA), insertElement);
    };

    formFilter.addEventListener('change', onFormFilter);
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
      switch(housingPriceElement.value) {
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
    var featuresElements = formFilter.querySelectorAll('.map__checkbox:checked');
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

  // Функция сброса всех значений формы фильтров
  var resetFilter = function () {
    mapFilter.reset();
    dataFlag = false;
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter,
    initiate: deleteData,
    employ: getFilterData
  };
})();
