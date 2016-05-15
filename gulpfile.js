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
var del        = require('del');

var paths = {
  'node_modules'          : 'node_modules/',
  'bower_components'      : 'bower_components/',
  'vendor'                : 'public/build/vendor/',
  'build_lib'             : 'public/build/js/lib/',
  'build_ng'              : 'public/build/js/ng/',
  'build_ng_components'   : 'public/build/js/ng/components/',
  'build_css'             : 'public/build/css/',
};

// DELETE PREVIOUS BUILD
// gulp.task('clean:build', function () {
//   console.log("Deleting previous build...");
//   return del([
//     'public/build/*',
//   ]);
// });

/* copy required libraries - e.g lodash, jquery and whatnot */
gulp.task('cp:default-libs', function() {
  return gulp.src([
    'node_modules/lodash/lodash.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/ngtouch/build/ngTouch.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
    'node_modules/restangular/dist/restangular.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',

    'node_modules/moment/min/moment.min.js',

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
    paths.build_lib + 'angular-animate.min.js',
    paths.build_lib + 'angular-sanitize.min.js',
    paths.build_lib + 'ngTouch.min.js',
    paths.build_lib + 'angular-ui-router.min.js',
    paths.build_lib + 'ui-bootstrap-tpls.js',
    paths.build_lib + 'angular-resource.min.js',
    paths.build_lib + 'angular-recaptcha.min.js',
    paths.build_lib + 'restangular.min.js',
    paths.build_lib + 'ng-file-upload.min.js',
    paths.build_lib + 'ng-file-upload-shim.min.js',

    paths.build_lib + 'moment.min.js',
  ])
  .pipe(concat('lib.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/build/js'));
});

/* compile and minified 3rdparty libs */
gulp.task('cp:vendor',[], function() {
  return gulp.src([
    paths.node_modules + 'angular-ui-grid/**',
    paths.node_modules + 'angular-loading-bar/**',
    paths.node_modules + 'ui-select/**',

  ],{"base":"./node_modules"})
  .pipe(gulp.dest('public/build/vendor'));
});

gulp.task('cp:vendor-bower',[], function() {
  return gulp.src([
    paths.bower_components + 'bootstrap-daterangepicker/**',
    paths.bower_components + 'angular-daterangepicker/**',

  ],{"base":"./bower_components"})
  .pipe(gulp.dest('public/build/vendor'));
});

gulp.task('compile:vendor',['cp:vendor','cp:vendor-bower'], function() {
  return gulp.src([
    //paths.vendor + '/**/*.min.js',
    paths.vendor + 'angular-ui-grid/ui-grid.min.js',
    paths.vendor + 'angular-loading-bar/build/loading-bar.min.js',
    paths.vendor + 'bootstrap-daterangepicker/daterangepicker.js',
    paths.vendor + 'angular-daterangepicker/js/angular-daterangepicker.min.js',
    paths.vendor + 'ui-select/dist/select.js',
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/build/vendor'));
});


/* compile angular components */
gulp.task('compile',['compile-lib','compile:assets','compile:vendor'], function() {
  return gulp.src([
    paths.build_ng + 'app.js',
    paths.build_ng_components + '*_service.js',
    paths.build_ng_components + '*_filter.js',
    paths.build_ng_components + '*_directive.js',
    paths.build_ng_components + '*_ctrl.js',
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


/* ======================================================= */
//
// Task for all CSS Assets
//
/* ======================================================= */


gulp.task('cp:fonts', function() {
  return gulp.src('public/fonts/**/*')
  .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('cp:images', function() {
  return gulp.src('public/images/**/*')
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
    // paths.vendor + 'angular-loading-bar/build/loading-bar.css',
    //paths.vendor + 'ui-select/dist/select.min.css',
    //'http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css',
  ])
  .pipe(concatCss('all.css'))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('public/build/css'));
});
