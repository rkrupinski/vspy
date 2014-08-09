'use strict';

function unique(arr) {
  var ret;

  if (arr.length < 2) {
    return arr;
  }

  ret = [];

  for (var i = 0, l = arr.length; i < l; i++) {
    !~ret.indexOf(arr[i]) && ret.push(arr[i]);
  }

  return ret;
}

module.exports = unique;
