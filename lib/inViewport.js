'use strict';

function inViewport(element) {
  var rect = element.getBoundingClientRect();

  return rect.top > -rect.height && 
      rect.bottom < window.innerHeight + rect.height;
}

module.exports = inViewport;
