'use strict';

var vspy = require('../../../index')
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

spyA.observe('.js_square-a');
spyB.observe('.js_square-b');
