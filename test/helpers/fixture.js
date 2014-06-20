'use strict';

var path = require('path')
  , BASE_PATH = '/base/test/fixtures';

module.exports = function (file, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    cb.call(null, this.responseText);
  };
  req.open('get', path.resolve(BASE_PATH, file), true);
  req.send();
};
