var {
  parallel,
  src,
  dest,
  task,
  watch
} = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  pump = require('pump'),
  browserSync = require('browser-sync');

// Source Paths for tasks
var sassSource = 'sass/**/*.sass',
  appJSSource = 'js/*.js',
  vendorJSSource = 'js/vendors/*.js',
  jsonSource = 'json/*.json';

// Destination Paths for tasks
var cssDestination = '../assets/css/',
  jsDestination = '../assets/js/',
  jsonDestination = '../assets/json/';

// SASS Task
task('sass', function (cb) {
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

// JavaScript Task
task('appJS', function (cb) {
  pump([
      src(appJSSource),
      plumber(),
      concat('app.js'),
      dest(jsDestination)
    ],
    cb
  );
})

// Vendor JavaScript Task
task('vendorJS', function (cb) {
  pump([
      src(vendorJSSource),
      plumber(),
      concat('vendors.js'),
      dest(jsDestination)
    ],
    cb
  );
})

// JSON Task
task('json', function (cb) {
  return src(jsonSource)
    .pipe(plumber())
    .pipe(dest(jsonDestination))
  cb();
})

// Watch Task
task('watch', function (cb) {
  browserSync.init({
      server: {
        baseDir: '../_site'
      },
      notify: true
    },
    function (err, bs) {
      bs.addMiddleware("*", function (req, res) {
        res.writeHead(302, {
          location: "404.html"
        });
        res.end("Redirecting!");
      });
    }
  );
  watch(sassSource, task('sass'));
  watch(appJSSource, task('appJS'));
  watch(vendorJSSource, task('vendorJS'));
  watch(jsonSource, task('json'));
  watch([
    '../_site/*.html',
    '../_site/assets/css/*.css',
    '../_site/assets/js/*.js',
    '../_site/assets/js/CrossBrowserJS/*.js',
    '../_site/assets/json/*.json'
  ]).on('change', browserSync.reload);
  cb();
})

// Default Task
exports.default = parallel(
  task('sass'),
  task('appJS'),
  task('vendorJS'),
  task('json'),
  task('watch'));