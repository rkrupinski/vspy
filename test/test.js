'use strict';

describe('vspy', function () {
  var vspy = require('..')
    , fixture = require('./helpers/fixture');

  describe('utils', function () {

    describe('.unique()', function () {
      var unique = require('../lib/util/unique');

      it('should remove duplicates from an array of DOM nodes',
          function () {
        var d = document.createElement('div');

        expect(unique([d, d, document.body])).toEqual(
            [d, document.body]);
      });

    });

  });

  describe('.inViewport()', function () {
    var inViewport = require('../lib/in-viewport');

    beforeEach(function (done) {
      fixture.load('inViewport.html', done);
    });

    afterEach(function () {
      fixture.cleanup();
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
    var isVisible = require('../lib/is-visible');

    beforeEach(function (done) {
      fixture.load('isVisible.html', done);
    });

    afterEach(function () {
      fixture.cleanup();
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

  describe('.create()', function () {
    var cb = function () {};

    it('should return a \'fresh\' instance', function () {
      var foo = vspy(cb);

      foo.observe(document.createElement('div'));

      expect(foo._targets.length).toEqual(1);
      expect(vspy(cb)._targets.length).toEqual(0);
    });

  });

  describe('.observe()', function () {

    beforeEach(function (done) {
      fixture.load('observables.html', done);
    });

    afterEach(function () {
      fixture.cleanup();
    });

    it('should ignore duplicates', function () {
      var foo = vspy(function () {})
        , div = document.createElement('div');

      foo.observe([div, div]);

      expect(foo._targets.length).toEqual(1);
    });

    it('should ignore previously handled targets', function () {
      var foo = vspy(function () {})
        , div = document.createElement('div');

      // hack
      div[foo._flag] = true;

      foo.observe(div);

      expect(foo._targets.length).toEqual(0);
    });

    it('should invoke the callback for each element in the viewport',
        function (done) {
      var cb = jasmine.createSpy('vspy callback')
        , foo = vspy(cb)
        , observables = $$('.js_observable');

      expect(cb).not.toHaveBeenCalled();

      foo.observe(observables);

      expect(cb.calls.count()).toEqual(1);
      expect(cb.calls.mostRecent().args[0])
          .toBe(observables[0]);

      window.scrollTo(0, 0);
      window.scrollTo(0, 100);

      setTimeout(function () {
        expect(cb.calls.count()).toEqual(2);
        expect(cb.calls.mostRecent().args[0])
          .toBe(observables[1]);
        done();
      }, 100);
    });

    it('should register the \'onscroll\' hander in a lazy manner',
        function () {
      var foo = vspy(function () {});

      spyOn(foo, '_subscribe');

      expect(foo._subscribe).not.toHaveBeenCalled();

      foo.observe('.foo');
        
      expect(foo._subscribe).not.toHaveBeenCalled();

      foo.observe('.js_observable');

      expect(foo._subscribe.calls.count()).toEqual(1);
    });

    it('should deregister the \'onscroll\' handler if possible',
        function (done) {
      var foo = vspy(function () {});

      spyOn(foo, '_unsubscribe');

      expect(foo._unsubscribe).not.toHaveBeenCalled();

      foo.observe('.js_observable');

      // hack
      foo._targets.length = 0;
      window.scrollTo(0, 0);
      window.scrollTo(0, 100);

      setTimeout(function () {
        expect(foo._unsubscribe.calls.count()).toEqual(1);
        done();
      }, 100);
    });

    it('should be chainable', function () {
      var foo = vspy(function () {});

      expect(foo.observe()).toBe(foo);
    });

  });

  describe('.prune()', function () {

    beforeEach(function (done) {
      fixture.load('observables.html', done);
    });

    afterEach(function () {
      fixture.cleanup();
    });

    it('should filter detached targets', function () {
      var foo = vspy(function () {});

      foo.observe('.js_observable');

      expect(foo._targets.length).toBeGreaterThan(0);

      foo._targets.forEach(function (target) {
        target.parentNode.removeChild(target);
      });

      foo.prune();

      expect(foo._targets.length).toEqual(0);
    });

    it('should be chainable', function () {
      var foo = vspy(function () {});

      expect(foo.prune()).toBe(foo);
    });

  });

  describe('.reset()', function () {

    beforeEach(function (done) {
      fixture.load('observables.html', done);
    });

    afterEach(function () {
      fixture.cleanup();
    });

    it('should mark target as unhandled', function () {
      var foo = vspy(function () {})
        , flag = foo._flag
        , observables = $$('.js_observable');

      foo.observe(observables);

      expect(observables[0][flag]).toBeDefined();

      foo.reset(observables[0]);

      expect(observables[0][flag]).toBeUndefined();
    });

    it('should be chainable', function () {
      var foo = vspy(function () {});

      expect(foo.reset()).toBe(foo);
    });

  });

});
