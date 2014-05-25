(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var lazyload = require('./lazyload')
  , img
  , i;

for (i = 0; i < 20; i++) {
  img = new Image();
  img.width = 500;
  img.height = 500;
  img.className = 'js_lazyload';
  img.src = 'http://dummyimage.com/500x500/fff/000.jpg&text=placeholder';
  img.setAttribute('data-src',
      'http://dummyimage.com/500x500/000/fff.jpg&text=image ' + (i + 1));
  document.body.appendChild(img);
}

lazyload.observe(document.querySelectorAll('.js_lazyload'));

},{"./lazyload":2}],2:[function(require,module,exports){
'use strict';

var spy = require('../../../lib/index')(callback);

function callback(img) {
  var url = img.getAttribute('data-src')
    , tmp;

  if (!url) return;

  tmp = new Image();
  tmp.onload = function () {
    img.src = url;
    img.className += ' reveal';
    tmp = null;
  };
  tmp.src = url;
}

module.exports = spy; 

},{"../../../lib/index":4}],3:[function(require,module,exports){
'use strict';

function inViewport(element) {
  var rect = element.getBoundingClientRect();

  return rect.top > -rect.height && 
      rect.bottom < window.innerHeight + rect.height;
}

module.exports = inViewport;

},{}],4:[function(require,module,exports){
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

  console.log(1);
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

},{"./inViewport":3,"./isVisible":5,"./trigger":6,"uniq":7}],5:[function(require,module,exports){
'use strict';

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

module.exports = isVisible;

},{}],6:[function(require,module,exports){
'use strict';

function trigger(element, type) {
  var ev = new Event(type);

  element.dispatchEvent(ev);
}

module.exports = trigger;

},{}],7:[function(require,module,exports){
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