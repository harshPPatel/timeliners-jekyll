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
    pump          = require('pump'),
    browserSync   = require('browser-sync');

var sassSource    = 'sass/**/*.sass',
    appJSSource   = 'js/*.js',
    vendorJSSource= 'js/vendors/*.js';

var cssDestination  = '../assets/css/',
    jsDestination   = '../assets/js/';

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
      src(appJSSource),
      plumber(),
      concat('app.js'),
      dest(jsDestination)
    ],
  cb
  );
})

task('vendorJS', function(cb) {
  pump([
      src(vendorJSSource),
      plumber(),
      concat('vendors.js'),
      dest(jsDestination)
    ],
  cb
  );
})

task('watch', function(cb) {
  browserSync.init({
    server: {
      baseDir: '../_site'
    },
    notify: true
  });
  watch(sassSource, task('sass'));
  watch(appJSSource, task('appJS'));
  watch(vendorJSSource, task('vendorJS'));
  watch([
    '../_site/**/**/*'
  ]).on('change', browserSync.reload);
  cb();
})

exports.default = parallel ( task('sass'), task('appJS'), task('vendorJS'), task('watch'));
