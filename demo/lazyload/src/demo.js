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
