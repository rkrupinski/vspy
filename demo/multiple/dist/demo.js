(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var vspy = require('../../..')
  , spyA = vspy(callback.bind(document.querySelector('.js_counter-a')))
  , spyB = vspy(callback.bind(document.querySelector('.js_counter-b')))
  , frag = document.createDocumentFragment()
  , squaresCount = 100
  , square
  , type;

function callback() {
  /*jshint validthis:true*/
  this.innerHTML = Number(this.innerHTML) + 1;
}

while (squaresCount--) {
  type = (Math.random() > 0.5 ? 'a' : 'b');
  square = document.createElement('div');
  square.className = 'square js_square-' + type;
  square.innerHTML = type;
  frag.appendChild(square);
}

document.body.appendChild(frag);

spyA.observe('.js_square-a');
spyB.observe('.js_square-b');

},{"../../..":2}],2:[function(require,module,exports){
'use strict';

module.exports = require('./lib/vspy');

},{"./lib/vspy":8}],3:[function(require,module,exports){
'use strict';

function inViewport(element, offset) {
  var rect = element.getBoundingClientRect()
    , o = offset || 0;

  return rect.top > -rect.height - o && 
      rect.bottom < window.innerHeight + rect.height + o;
}

module.exports = inViewport;

},{}],4:[function(require,module,exports){
'use strict';

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

module.exports = isVisible;

},{}],5:[function(require,module,exports){
'use strict';

var isVisible  = require('./is-visible')
  , inViewport = require('./in-viewport');

function process() {
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

module.exports = process;

},{"./in-viewport":3,"./is-visible":4}],6:[function(require,module,exports){
'use strict';

var raf = window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

module.exports = raf;

},{}],7:[function(require,module,exports){
'use strict';

function unique(arr) {
  var result = []
    , l = arr.length
    , i;

  for (i = 0; i < l; i++) {
    !~result.indexOf(arr[i]) && result.push(arr[i]);
  }

  return result;
}

module.exports = unique;

},{}],8:[function(require,module,exports){
'use strict';

var unique     = require('./util/unique')
  , raf        = require('./util/raf')
  , process    = require('./process')
  , domArray   = require('dom-array');

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
    var targetArr = domArray(target).filter(function (el) {
      return !el[this._flag];
    }, this);

    if (targetArr.length) {
      !this._targets.length && this._subscribe();
      this._targets = unique(this._targets.concat(targetArr));
      process.call(this);
    }

    return this;
  },

  reset: function (target) {
    domArray(target).forEach(function (el) {
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

},{"./process":5,"./util/raf":6,"./util/unique":7,"dom-array":9}],9:[function(require,module,exports){
'use strict';

var parse = require('parse-html')
  , slice = [].slice;

function convert(arg, ctx) {
  var result = []
    , query
    , nodes;

  switch (true) {
    case (typeof arg === 'string'):
      query = [];
      nodes = [];

      try {
        query = (ctx || document).querySelectorAll(arg);
      } catch (e) {
        nodes = parse(arg);
      }

      query.length && (result = slice.call(query));
      nodes.length && (result = nodes);
      query = nodes = null;
      break;
    case (arg instanceof NodeList):
      result = slice.call(arg);
      break;
    case (arg instanceof Element || arg === document ||
        arg === window):
      result.push(arg);
      break;
    case (Array.isArray(arg)):
      result = arg;
      break;
    default:
      break;
  }

  return result;
}

module.exports = convert;

},{"parse-html":10}],10:[function(require,module,exports){
'use strict';

function parse(str) {
  var doc = document.implementation.createHTMLDocument('');

  doc.body.innerHTML = str;
  return [].slice.call(doc.body.children);
}

module.exports = parse;

},{}]},{},[1])