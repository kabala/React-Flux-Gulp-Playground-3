var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');


var usemin = require('gulp-usemin');
//var uglify = require('gulp-uglify');
//var minifyHtml = require('gulp-minify-html');
//var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('browserify', function () {
  gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(browserify({ transform: 'reactify', debug: true }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('jade', function () {
  gulp.src('src/index.jade')
    .pipe(plumber())
    .pipe(jade({
      //client: true,
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('sass', function () {
  gulp.src('src/style/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/style'));
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(plumber())
    .pipe(server({
      livereload: true,
      //directoryListing: true,
      open: true
    }));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/style/main.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('src/js/*.*', ['browserify']);
});

gulp.task('jade:watch', function () {
  gulp.watch('src/*.jade', ['jade']);
});

gulp.task('watch', ['js:watch', 'sass:watch',  'jade:watch']);

gulp.task('default', ['browserify', 'sass', 'jade']);
