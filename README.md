vspy
====
A simple viewport spy.

Usage
-----
Factory - accepts `2` parameters: a `callback` and an optional `options` object.
```js
var spy = require('vspy')(callback /*, [options] */);

function callback(element) {
  // do stuff
}
```

Callback function - called once for each `element`, right after it reaches the viewport. After that, `element` gets removed from the pool.

Options:
- `offset` - define a custom scroll offset (top/bottom)

Methods: 
- `observe` - adds elements to the pool. Dupplicates and previously handled elements are removed. It accepts instances of `Element`, `NodeList` and `Array`.
```js
spy.observe(document.querySelectorAll('.foo'));
```

Examples
--------
- [lazyload](http://rkrupinski.github.io/vspy/demo/lazyload)
- [multiple](http://rkrupinski.github.io/vspy/demo/multiple)

Installation
------------
```bash
$ npm install vspy
```

Browser support
---------------
IE9+