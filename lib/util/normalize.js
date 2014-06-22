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
