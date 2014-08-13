'use strict';

var unique     = require('./util/unique')
  , raf        = require('./util/raf')
  , process    = require('./process')
  , domArray   = require('dom-array');

var proto = {

  _subscribe: function () {
    (this._options.container || window).addEventListener(
        'scroll', this._handleScroll);
  },

  _unsubscribe: function () {
    (this._options.container || window).removeEventListener(
        'scroll', this._handleScroll);
  },

  observe: function (target) {
    var targetArr = domArray(target).filter(function (el) {
      return !el[this._flag];
    }, this);

    if (targetArr.length) {
      !this._targets.length && this._subscribe();
      this._targets = unique(this._targets.concat(targetArr));
      this.poke();
    }

    return this;
  },

  poke: function () {
    process.call(this);

    return this;
  },

  prune: function () {
    this._targets = this._targets.filter(
      // remove detached nodes
      document.contains.bind(document));

    return this;
  },

  reset: function (target) {
    domArray(target).forEach(function (el) {
      delete el[this._flag];
    }, this);

    return this;
  }

};

function create(callback, options) {
  var inst = Object.create(proto);

  inst._callback = callback;
  inst._options = options || {};
  inst._targets = [];
  inst._flag = '__vspy' + Date.now();
  inst._handleScroll = raf.bind(window,
      process.bind(inst));

  return inst;
}

module.exports = create;
