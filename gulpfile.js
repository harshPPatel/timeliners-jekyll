var { parallel,
      src,
      dest,
      task,
      watch }     = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    cleanCSS      = require('gulp-clean-css'),
    sass          = require('gulp-sass'),
    plumber       = require('gulp-plumber'),
    concat        = require('gulp-concat'),
    minify        = require('gulp-minify'),
    pump          = require('pump');

var sassSource    = '_sass/**/*.sass',
    jsSource      = 'js/*.js';

var cssDestination  = 'assets/css/',
    jsDestination   = 'assets/js/';

task('sass', function(cb) {
  return src(sassSource)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ["cover 99.5%"]
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('styles.css'))
    .pipe(dest(cssDestination))
  cb();
})

task('appJS', function(cb) {
  pump([
      src(jsSource),
      plumber(),
      concat('app.js'),
      minify(),
      dest(jsDestination)
    ],
  cb
  );
})

task('watch', function(cb) {
  watch(sassSource, task('sass'));
  watch(jsSource, task('appJS'));
  cb();
})

exports.default = parallel ( task('sass'), task('appJS'), task('watch'));
