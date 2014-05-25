'use strict';

function trigger(element, type) {
  var ev = new Event(type);

  element.dispatchEvent(ev);
}

module.exports = trigger;
