var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');


gulp.task('browserify', function () {
  gulp.src('src/main.js')
    .pipe(plumber())
    .pipe(browserify({ transform: 'reactify', debug: true }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('jade', function () {
  gulp.src('src/index.jade')
    .pipe(plumber())
    .pipe(jade({
      client: true,
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('sass', function () {
  gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(gulp.dest('public/styles'));
});

gulp.task('default', ['browserify', 'sass', 'jade']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});