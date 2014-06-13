'use strict';

function unique(arr) {
  var result = []
    , l = arr.length
    , i;

  for (i = 0; i < l; i++) {
    !~result.indexOf(arr[i]) && result.push(arr[i]);
  }

  return result;
}

module.exports = unique;
