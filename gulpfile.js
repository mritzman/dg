var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('concatCss', function () {
  return gulp.src('./app/css/*.css')
    .pipe(concatCss('./css/style.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('default', ['sass', 'concatCss', 'uglify']);
