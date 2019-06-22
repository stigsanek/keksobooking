'use strict';

//  Модуль генерации данных
(function () {
  var createData = function (objectTypeHousing, element) {
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
      items[i]['offer']['type'] = objectTypeHousing[Math.floor(Math.random() * objectTypeHousing.length)];
      items[i]['location']['x'] = Math.floor(Math.random() * element.offsetWidth);
      items[i]['location']['y'] = getRandom(130, 630);
    }

    return items;
  };

  window.data = {
    getData: createData
  };
})();
