vspy
====

A simple viewport spy.

Usage:
------

Factory. Accepts `callback` function as a parameter.
```js
var spy = require('vspy')(callback);
```

Callback function. Called once for each `element`; right after it reaches the viewport. After that, `element` gets removed from the pool.
```js
function callback(element) {
  // do stuff
}
```

Methods: `observe()`. Adds elements to the pool. Dupplicates and previously handled elements are removed. It accepts instances of `Element`, `NodeList` and `Array`.
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
