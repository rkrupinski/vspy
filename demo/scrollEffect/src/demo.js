'use strict';

var effect = require('./effect')
  , frag = document.createDocumentFragment()
  , div
  , i;

for (i = 0; i < 100; i++) {
  div = document.createElement('div');
  div.className = 'div js_div';
  div.style.height = Math.ceil(Math.random() * 300) + 100 + 'px';
  frag.appendChild(div);
}

document.body.appendChild(frag);

effect.observe(document.querySelectorAll('.js_div'));
