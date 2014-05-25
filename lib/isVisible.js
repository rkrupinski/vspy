'use strict';

function isVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

module.exports = isVisible;
