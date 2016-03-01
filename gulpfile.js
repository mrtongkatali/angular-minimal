'use strict';

var gulp       = require('gulp');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var flatten    = require('gulp-flatten');
var sass       = require('gulp-sass');
var concatCss  = require('gulp-concat-css');
var minifyCss  = require('gulp-minify-css');
var watch      = require('gulp-watch');

var paths = {
  'build_lib'             : 'public/build/js/lib/',
  'build_ng'              : 'public/build/js/ng/',
  'build_ng_components'   : 'public/build/js/ng/components/',
  'build_css'             : 'public/build/css/',
};

/* copy required libraries = e.g lodash, jquery and whatnot */
gulp.task('cp:default-libs', function() {
  return gulp.src([
    'node_modules/lodash/lodash.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-resource/angular-resource.min.js',
  ])
  .pipe(flatten())
  .pipe(gulp.dest('public/build/js/lib'));
});

/* copy angular app.js */
gulp.task('cp:ng-app', function() {
  return gulp.src(['app.js',])
  .pipe(gulp.dest('public/build/js/ng'));
});

/* copy angular components */
gulp.task('cp:ng-components', function() {
  return gulp.src([
    'controllers/*.js',
    'directives/*.js',
    'filters/*.js',
    'services/*.js',
  ])
  .pipe(gulp.dest('public/build/js/ng/components'));
});

/* compile and minified required libs */
gulp.task('compile-lib',[
  'cp:default-libs',
  'cp:ng-app',
  'cp:ng-components',
], function() {
  return gulp.src([
    paths.build_lib + 'lodash.js',
    paths.build_lib + 'jquery.min.js',
    paths.build_lib + 'angular.min.js',
    paths.build_lib + 'angular-ui-router.min.js',
    paths.build_lib + 'ui-bootstrap-tpls.js',
    paths.build_lib + 'angular-resource.min.js',
  ])
  .pipe(concat('lib.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/build/js'));
});

/* compile angular components */
gulp.task('compile',['compile-lib','compile:assets'], function() {
  return gulp.src([
    paths.build_ng + 'app.js',
    paths.build_ng_components + '*.js',
  ])
  .pipe(concat('ng.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('public/build/js'));
});

/* compile angular components only */
gulp.task('compile:ng-only',[
  'cp:ng-app',
  'cp:ng-components',
], function() {
  return gulp.src([
    paths.build_ng + 'app.js',
    paths.build_ng_components + '*.js',
  ])
  .pipe(concat('ng.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('public/build/js'));
});

// CSS ASSETS

gulp.task('cp:fonts', function() {
  return gulp.src('public/fonts/*')
  .pipe(gulp.dest('public/build/css/fonts'));
});

gulp.task('cp:images', function() {
  return gulp.src('public/images/*')
  .pipe(gulp.dest('public/build/css/images'));
});

gulp.task('cp:css', function() {
  return gulp.src('public/css/*.css')
  .pipe(gulp.dest('public/build/css'));
});

gulp.task('compile:twbs-sass', function () {
  return gulp.src('public/css/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/build/css'));
});

gulp.task('compile:assets',[
  'cp:fonts',
  'cp:images',
  'cp:css',
  'compile:twbs-sass',
], function() {
  return gulp.src([
    paths.build_css + '*.css',
  ])
  .pipe(concatCss('all.css'))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('public/build/css'));
});
