'use strict';

var spy = require('../../../lib/index')(callback);

function callback(element) {
  element.classList.add('reveal');
  element.style.color = '#' + Math.round(Math.random() * 200 +
      55).toString(16) + '0000';
}

module.exports = spy;
