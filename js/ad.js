'use strict';

//  Модуль создания метки, карточки и ошибки загрузки объявления
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ESC_KEYCODE = 27;

  var typeHouseMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var featuresClassMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var currentPin = null; // текущая метка
  var currentCard = null; // текущая карточка

  // Callback для отрисовки карточки на карте
  var insertCard = null;
  var addCard = function (insertMethod) {
    insertCard = insertMethod;
  };

  // Метод создания метки объявления
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (element) {
    var newPinElement = templatePinElement.cloneNode(true);
    if (element['offer'] !== null) {
      newPinElement.style.left = element['location']['x'] - PIN_WIDTH / 2 + 'px';
      newPinElement.style.top = element['location']['y'] - PIN_HEIGHT + 'px';
      var pictureElement = newPinElement.querySelector('img');
      pictureElement.src = element['author']['avatar'];
      pictureElement.alt = element['offer']['title'];
    }

    newPinElement.addEventListener('click', function () {
      closeCard();
      insertCard(element, createNewCard);

      if (currentPin) {
        currentPin.classList.remove('map__pin--active');
      }
      currentPin = newPinElement;
      currentPin.classList.add('map__pin--active');

      document.addEventListener('keydown', onCardEscPress);
    });

    return newPinElement;
  };

  // Метод создания карточки объявления
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  var createNewCard = function (element) {
    var newCardElement = templateCardElement.cloneNode(true);
    newCardElement.querySelector('img').src = element['author']['avatar'];
    newCardElement.querySelector('.popup__title').textContent = element['offer']['title'];
    newCardElement.querySelector('.popup__text--address').textContent = element['offer']['address'];
    newCardElement.querySelector('.popup__text--price').textContent = element['offer']['price'] + '₽/ночь';
    newCardElement.querySelector('.popup__type').textContent = typeHouseMap[element['offer']['type']];
    newCardElement.querySelector('.popup__text--capacity').textContent = element['offer']['rooms'] + ' комнаты для ' + element['offer']['guests'] + ' гостей';
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element['offer']['checkin'] + ', выезд до ' + element['offer']['checkout'];

    // Если в полученных данных есть блок с удобствами, то он добавляется
    var featuresListElements = newCardElement.querySelector('.popup__features');
    var featuresElements = newCardElement.querySelectorAll('.popup__feature');
    var featuresItemElement = newCardElement.querySelector('.popup__feature:first-child');
    featuresItemElement.className = 'popup__feature';
    if (element['offer']['features'] !== null) {
      featuresElements.forEach(function (it) {
        it.remove();
      });
      var fragmentFeaturesElement = document.createDocumentFragment();
      element['offer']['features'].forEach(function (it) {
        var newFeaturesElement = featuresItemElement.cloneNode('true');
        newFeaturesElement.classList.add(featuresClassMap[it]);
        fragmentFeaturesElement.appendChild(newFeaturesElement);
      });
      featuresListElements.appendChild(fragmentFeaturesElement);
    } else {
      featuresListElements.remove();
    }

    newCardElement.querySelector('.popup__description').textContent = element['offer']['description'];

    // Если в полученных данных есть фотографии, то они добавляются
    var pictureWrapElement = newCardElement.querySelector('.popup__photos');
    var pictureElement = pictureWrapElement.querySelector('.popup__photo');
    if (element['offer']['photos'] !== null) {
      pictureElement.remove();
      var fragmentPictureElement = document.createDocumentFragment();
      element['offer']['photos'].forEach(function (it) {
        var newPictureElement = pictureElement.cloneNode(true);
        newPictureElement.src = it;
        fragmentPictureElement.appendChild(newPictureElement);
      });
      pictureWrapElement.appendChild(fragmentPictureElement);
    } else {
      pictureWrapElement.remove();
    }

    currentCard = newCardElement;

    currentCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    return newCardElement;
  };

  // Функция закрытия карточки объявления
  var closeCard = function () {
    if (currentCard) {
      currentCard.remove();
      currentPin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
    }
    currentCard = null;
  };

  // Функция закрытия карточки по ESC
  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  window.ad = {
    createPin: createNewPin,
    createCard: createNewCard,
    init: addCard
  };
})();
