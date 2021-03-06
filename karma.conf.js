'use strict';

module.exports = {
  browsers: [
    // 'Chrome',
    'Firefox',
    // 'Opera',
    // 'Safari',
    // 'IE'
  ],
  frameworks: [
    'jasmine'
  ],
  files: [
    'bower_components/normalize-css/normalize.css',
    'test/styles/test.css',
    'test/helpers/dom.js',
    '.tmp/test/*.js',
    {
      pattern: 'test/fixtures/*.html',
      watched: false,
      served: true,
      included: false
    }
  ]
};
