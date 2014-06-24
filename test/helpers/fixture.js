'use strict';

var path = require('path')
  , BASE_PATH = '/base/test/fixtures';

function getFixture(file, cb) {
  var req = new XMLHttpRequest();

  req.onload = function () {
    cb.call(null, this.responseText);
  };
  req.open('get', path.resolve(BASE_PATH, file), true);
  req.send();
};

exports.load = function (file, done) {
  var container = document.createElement('div');

  container.id = 'test';
  document.body.insertBefore(container,
      document.body.firstElementChild);

  getFixture(file, function (res) {
    container.innerHTML = res;
    typeof done === 'function' && done();
  });
};

exports.cleanup = function () {
  var container = document.querySelector('#test');

  container.parentNode.removeChild(container);
};
