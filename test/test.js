'use strict';

var vspy = require('../index')
  , fixture = require('./helpers/fixture');

describe('vspy', function () {

  describe('.inViewport()', function () {
    var inViewport = require('../lib/inViewport');

    beforeEach(function (done) {
      fixture.load('inViewport.html', done);
    });

    afterEach(function () {
      fixture.reset();
    });

    it('should recognize elements in the viewport',
        function () {
      expect(inViewport($('.js_in-viewport-1'))).toBe(true);
    });

    it('should recognize elements outside the viewport',
        function () {
      expect(inViewport($('.js_in-viewport-2'))).toBe(false);
    });

    it('should take \'offset\' into account', function () {
      expect(inViewport($('.js_in-viewport-2'), 1)).toBe(true);
    });

  });

  describe('.isVisible()', function () {
    var isVisible = require('../lib/isVisible');

    beforeEach(function (done) {
      fixture.load('isVisible.html', done);
    });

    afterEach(function () {
      fixture.reset();
    });

    it('should consider \'0x0\' elements invisible',
        function () {
      expect(isVisible($('.js_is-visible-1'))).toBe(false);
    });

    it('should consider elements outside the viewport visible',
        function () {
      expect(isVisible($('.js_is-visible-2'))).toBe(true);
    });

    it('should consider \'display: none;\' elements invisible',
        function () {
      expect(isVisible($('.js_is-visible-3'))).toBe(false);
    });

    it('should consider children of \'display: none;\' elements invisible',
        function () {
      expect(isVisible($('.js_is-visible-4'))).toBe(false);
    });

  });

});
