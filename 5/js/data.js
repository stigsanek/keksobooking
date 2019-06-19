'use strict';

//  Модуль генерации случайных данных
(function () {
  var TYPE_OG_HOUSING = ['bungalo', 'flat', 'house', 'palace'];

  var mapPinListElement = document.querySelector('.map__pins');

  window.data = {
    get: function () {
      var items = [];

      var getRandom = function (min, max) {
        var random = Math.floor(min + Math.random() * (max - min));
        return random;
      };

      for (var i = 0; i < 8; i++) {
        items[i] = {
          'author': {
            'avatar': ''
          },
          'offer': {
            'type': ''
          },
          'location': {
            'x': '',
            'y': ''
          }
        };

        items[i]['author']['avatar'] = 'img/avatars/user0' + (i + 1) + '.png';
        items[i]['offer']['type'] = TYPE_OG_HOUSING[Math.floor(Math.random() * TYPE_OG_HOUSING.length)];
        items[i]['location']['x'] = Math.floor(Math.random() * mapPinListElement.offsetWidth);
        items[i]['location']['y'] = getRandom(130, 630);
      }

      return items;
    }
  };
})();
