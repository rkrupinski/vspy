vspy
====
A simple viewport spy.

[![Build Status](https://travis-ci.org/rkrupinski/vspy.png)](https://travis-ci.org/rkrupinski/vspy)

Usage
-----
Factory - accepts `2` parameters:
- `callback` - function called once for each `element`, right after it reaches the viewport. It is passed a reference to `element` as a parameter. Once it's called, the `element` gets marked as handled and removed from the pool.
- `options` (optional) - available configuration options include:
  - `offset` - custom scroll offset (vertical)

API: 
- `observe(target)` - adds elements to the pool. Duplicates and previously handled elements are removed. It accepts either a CSS selector or instances of `Element`, `NodeList` and `Array` as a parameter.
- `reset(target)` - marks target as unhandled in the context of the current spy.
- `prune()` - a target can be detached at any time, successfully preventing the `onscroll` callback from being deregistered. Use this method to notify the instance, that the DOM structure has changed. It accepts no parameters.

Example
-------
Simple spy:
```js
var spy = require('vspy')(callback);

function callback(el) {
  console.log(el.nodeName + ' reached the viewport!');
}

spy.observe('.foo');
```

Other examples:
- [lazyload](http://rkrupinski.github.io/vspy/demo/lazyload)
- [multiple](http://rkrupinski.github.io/vspy/demo/multiple)

Installation
------------
```bash
$ npm install vspy
```

Test
----
```bash
$ npm test
```

Browser support
---------------
IE9+