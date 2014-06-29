(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var lazyload = require('./lazyload')
  , frag = document.createDocumentFragment()
  , img
  , i;

for (i = 0; i < 100; i++) {
  img = new Image();
  img.width = 500;
  img.height = 500;
  img.className = 'js_lazyload';
  img.src = 'http://dummyimage.com/500x500/fff/000.jpg&text=placeholder';
  img.setAttribute('data-src',
      'http://dummyimage.com/500x500/000/fff.jpg&text=image ' + (i + 1));
  frag.appendChild(img);
}

document.body.appendChild(frag);

lazyload.observe('.js_lazyload');

},{"./lazyload":2}],2:[function(require,module,exports){
'use strict';

var vspy = require('../../..')
  , spy = vspy(callback, { offset: 150 });

function callback(img) {
  var url = img.getAttribute('data-src')
    , tmp;

  if (!url) {
    return;
  }

  tmp = new Image();
  tmp.onload = function () {
    img.src = url;
    img.classList.add('reveal');
    tmp = null;
  };
  tmp.src = url;
}

module.exports = spy; 

},{"../../..":3}],3:[function(require,module,exports){
'use strict';

module.exports = require('./lib/vspy');

},{"./lib/vspy":9}],4:[function(require,module,exports){
'use strict';

function inViewport(element, offset) {
  var rect = element.getBoundingClientRect()
    , o = offset || 0;

  return rect.top > -rect.height - o && 
      rect.bottom < window.innerHeight + rect.height + o;
}

module.exports = inViewport;

},{}],5:[function(require,module,exports){
'use strict';

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

module.exports = isVisible;

},{}],6:[function(require,module,exports){
'use strict';

var slice = [].slice;

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

module.exports = normalize;

},{}],7:[function(require,module,exports){
'use strict';

var raf = window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

module.exports = raf;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

var unique     = require('./util/unique')
  , raf        = require('./util/raf')
  , normalize  = require('./util/normalize')
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
    var targetArr = normalize(target).filter(function (el) {
      return !el[this._flag];
    }, this);

    if (targetArr.length) {
      !this._targets.length && this._subscribe();
      this._targets = unique(this._targets.concat(targetArr));
      processTargets.call(this);
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

function processTargets() {
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
      processTargets.bind(inst));

  return inst;
}

module.exports = create;

},{"./inViewport":4,"./isVisible":5,"./util/normalize":6,"./util/raf":7,"./util/unique":8}]},{},[1])