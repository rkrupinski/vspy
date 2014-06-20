'use strict';

var vspy = require('../index')
  , fixture = require('./helpers/fixture');

describe('vspy', function () {

  beforeEach(function (done) {
    fixture('test.html', function (html) {
      document.body.insertAdjacentHTML('afterbegin', html);
      done();
    });
  });

  afterEach(function () {
    var container = document.querySelector('#test');
    container.parentNode.removeChild(container);
  });

  it('foo', function () {
    expect(typeof vspy).toBe('function');
  });

});
