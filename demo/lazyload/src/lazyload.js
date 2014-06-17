'use strict';

var vspy = require('../../../index')
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
