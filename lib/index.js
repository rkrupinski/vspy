'use strict';

var unique     = require('./util/unique')
  , trigger    = require('./util/trigger')
  , raf        = require('./util/raf')
  , isVisible  = require('./isVisible')
  , inViewport = require('./inViewport');

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
    var targetArr = [];

    switch (true) {
      case Array.isArray(target):
        targetArr = target;
        break;
      case (target instanceof NodeList):
        targetArr = [].slice.call(target);
        break;
      case (target instanceof Element):
        targetArr.push(target);
        break;
    }

    targetArr = targetArr.filter(function (el) {
      return !el[this._flag];
    }, this);

    if (targetArr.length) {
      !this._targets.length && this._subscribe();
      this._targets = unique(this._targets.concat(targetArr));
      targetArr = null;
      trigger(window, 'scroll');
    }

    return this;
  },

  prune: function () {
    this._targets = this._targets.filter(
      document.contains.bind(document));

    return this;
  }

};

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
