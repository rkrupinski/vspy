'use strict';

module.exports = {
  browsers: [
    'PhantomJS'
  ],
  frameworks: [
    'jasmine'
  ],
  files: [
    '.tmp/test/*.js',
    {
      pattern: 'bower_components/normalize-css/normalize.css',
      watched: false,
      served: true,
      included: true
    },
    {
      pattern: 'test/fixtures/*.html',
      watched: false,
      served: true,
      included: false
    }
  ],
  singleRun: true
};
