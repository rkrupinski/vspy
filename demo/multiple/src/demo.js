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
  this.innerText = Number(this.innerText) + 1;
}

while (squaresCount--) {
  type = Math.random() > 0.5 ? 'a' : 'b';
  square = document.createElement('div');
  square.className = 'square js_square-' + type;
  square.innerText = type;
  frag.appendChild(square);
}

document.body.appendChild(frag);

spyA.observe(document.querySelectorAll('.js_square-a'));
spyB.observe(document.querySelectorAll('.js_square-b'));
