'use strict';

//  Модуль создания метки, карточки и ошибки загрузки объявления
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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
    if (element['offer']) {
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
    newCardElement.querySelector('.popup__text--price').textContent = element['offer']['price'];
    newCardElement.querySelector('.popup__type').textContent = element['offer']['type'];
    newCardElement.querySelector('.popup__text--capacity').textContent = element['offer']['rooms'] + ' комнаты для ' + element['offer']['guests'] + ' гостей';
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element['offer']['checkin'] + ' выезд до ' + element['offer']['checkout'];
    newCardElement.querySelector('.popup__description').textContent = element['offer']['description'];
    currentCard = newCardElement;

    currentCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
      currentPin.classList.remove('map__pin--active');
    });
    return newCardElement;
  };

  var closeCard = function () {
    if (currentCard) {
      currentCard.remove();
    }
    currentCard = null;
  };

  window.ad = {
    createPin: createNewPin,
    createCard: createNewCard,
    init: addCard
  };
})();
