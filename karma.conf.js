'use strict';

module.exports = {
  browsers: [
    // 'PhantomJS'
    'Chrome',
    'Firefox',
    'Opera',
    'Safari'
  ],
  frameworks: [
    'jasmine'
  ],
  files: [
    'bower_components/normalize-css/normalize.css',
    'test/styles/test.css',

    // https://groups.google.com/forum/#!msg/phantomjs/r0hPOmnCUpc/uxusqsl2LNoJ
    // 'test/helpers/bind.js',

    '.tmp/test/*.js',
    {
      pattern: 'test/fixtures/*.html',
      watched: false,
      served: true,
      included: false
    }
  ],
  singleRun: true
};
