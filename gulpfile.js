'use strict';

var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , karma = require('karma').server
  , browserify = require('gulp-browserify')
  , clean = require('gulp-clean')
  , karmaConfig = require('./karma.conf');

gulp.task('jshint', function () {
  return gulp
      .src('lib/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('prepare', function () {
  return gulp
      .src('test/test.js')
      .pipe(browserify())
      .pipe(gulp.dest('.tmp/test'));
});

gulp.task('cleanup', function () {
  return gulp
      .src('.tmp', {read: false})
      .pipe(clean());
});

gulp.task('karma', function (done) {
  karma.start(karmaConfig, done);
});

gulp.task('test', [
  'jshint',
  'karma'
]);
