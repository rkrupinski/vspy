'use strict';

var unique     = require('./util/unique')
  , raf        = require('./util/raf')
  , isVisible  = require('./isVisible')
  , inViewport = require('./inViewport')
  , slice      = [].slice;

var proto = {

  _subscribe: function () {
    window.addEventListener('scroll',
        this._handleScroll);
  },

  _unsubscribe: function () {
    window.removeEventListener('scroll',
        this._handleScroll);
  },

  observe: function (target) {
    var targetArr = normalize(target).filter(function (el) {
      return !el[this._flag];
    }, this);

    if (targetArr.length) {
      !this._targets.length && this._subscribe();
      this._targets = unique(this._targets.concat(targetArr));
      this._handleScroll();
    }

    return this;
  },

  reset: function (target) {
    normalize(target).forEach(function (el) {
      delete el[this._flag];
    }, this);

    return this;
  },

  prune: function () {
    this._targets = this._targets.filter(
      // remove detached nodes
      document.contains.bind(document));

    return this;
  }

};

function normalize(target) {
  var result = [];

  switch (true) {
    case (typeof target === 'string'):
      try {
        result = slice.call(document.querySelectorAll(target));
      } catch (err) {
        // invalid selector
      }
      break;
    case (target instanceof NodeList):
      result = slice.call(target);
      break;
    case (target instanceof Element):
      result.push(target);
      break;
    case Array.isArray(target):
      result = target;
      break;
  }

  return result;
}

function handleScroll() {
  /*jshint validthis:true*/
  var i = this._targets.length
    , current;

  while (i--) {
    current = this._targets[i];

    if (!isVisible(current)) {
      continue;
    }

    if (!inViewport(current, this._options.offset)) {
      continue;
    }

    Object.defineProperty(current, this._flag, {
      value: true,
      configurable: true
    });

    this._targets.splice(i, 1);
    this._callback.call(null, current);
  }

  !this._targets.length && this._unsubscribe();
}

function create(callback, options) {
  var inst = Object.create(proto);

  inst._callback = callback;
  inst._options = options || {};
  inst._targets = [];
  inst._flag = '__vspy' + Date.now();
  inst._handleScroll = raf.bind(window,
      handleScroll.bind(inst));

  return inst;
}

module.exports = create;
