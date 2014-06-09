(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var vspy = require('../../../lib/index')
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

spyA.observe(document.querySelectorAll('.js_square-a'));
spyB.observe(document.querySelectorAll('.js_square-b'));

},{"../../../lib/index":3}],2:[function(require,module,exports){
'use strict';

function inViewport(element, offset) {
  var rect = element.getBoundingClientRect()
    , o = offset || 0;

  return rect.top > -rect.height - o && 
      rect.bottom < window.innerHeight + rect.height + o;
}

module.exports = inViewport;

},{}],3:[function(require,module,exports){
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

    if (!isVisible(current)) {
      continue;
    }

    if (!inViewport(current, this._options.offset)) {
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

function create(callback, options) {
  var inst = Object.create(proto);

  inst._callback = callback;
  inst._options = options || {};
  inst._targets = [];
  inst._flag = '__vspy' + Date.now();
  inst._handleScroll = window.requestAnimationFrame.bind(
      window, handleScroll.bind(inst));

  return inst;
}

module.exports = create;

},{"./inViewport":2,"./isVisible":4,"./trigger":5,"uniq":6}],4:[function(require,module,exports){
'use strict';

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

module.exports = isVisible;

},{}],5:[function(require,module,exports){
'use strict';

function trigger(element, type) {
  var ev = new Event(type);

  element.dispatchEvent(ev);
}

module.exports = trigger;

},{}],6:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return []
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique
},{}]},{},[1])