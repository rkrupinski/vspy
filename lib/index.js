'use strict';

var uniq       = require('uniq')
  , trigger    = require('./trigger')
  , isVisible  = require('./isVisible')
  , inViewport = require('./inViewport') 
  , slice      = [].slice;

var proto = {

  _subscribe: function () {
    window.addEventListener('scroll', this._handleScroll);
  },

  _unsubscribe: function () {
    window.removeEventListener('scroll', this._handleScroll);
  },

  observe: function (targets) {
    switch (true) {
      case (targets instanceof NodeList):
        targets = slice.call(targets);
        break;
      case (targets instanceof Element):
        targets = [targets];
        break;
    }

    if (targets.length) {
      !this._targets.length && this._subscribe();

      this._targets = uniq(this._targets.concat(targets))
          .filter(function (target) {
            return !target[this._flag];
          }, this);

      trigger(window, 'scroll');
    }

    return this;
  }

};

function handleScroll() {
  /*jshint validthis:true*/
  var i = this._targets.length
    , current;

  while (i--) {
    current = this._targets[i];

    if (!isVisible(current) || !inViewport(current)) {
      continue;
    }

    Object.defineProperty(current, this._flag, {
      value: true
    });

    this._targets.splice(i, 1);
    this._callback.call(null, current);
  }

  !this._targets.length && this._unsubscribe();
}

function create(callback) {
  var inst = Object.create(proto);

  inst._callback = callback;
  inst._targets = [];
  inst._flag = '__vspy' + Date.now();
  inst._handleScroll = window.requestAnimationFrame.bind(
      window, handleScroll.bind(inst));

  return inst;
}

module.exports = create;
