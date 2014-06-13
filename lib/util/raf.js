'use strict';

var raf = window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

module.exports = raf;
