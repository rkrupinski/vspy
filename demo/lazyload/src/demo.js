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
