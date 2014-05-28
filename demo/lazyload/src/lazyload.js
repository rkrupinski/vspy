'use strict';

var spy = require('../../../lib/index')(callback);

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
