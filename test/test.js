'use strict';

var vspy = require('../index')
  , fixture = require('./helpers/fixture');

describe('vspy', function () {

  beforeEach(function (done) {
    fixture.load('test.html', done);
  });

  afterEach(function () {
    fixture.reset();
  });

  describe('foo', function () {

    it('bar', function () {
      expect(typeof vspy).toBe('function');
    });

  });

});
