const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
//sass compile
function styleSass () {
	return gulp.src('./src/sass/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      grid: true
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./docs/css'))
  .pipe(browserSync.stream())
}

function HTMLpug () {
  return gulp.src([
    './src/**/*.pug',
    '!./src/includes/*.pug'
  ])
  .pipe(pug({
      pretty: true
  }))
  .pipe(gulp.dest('./docs/'))
  .pipe(browserSync.stream())
}

function watch () {
  browserSync.init({
    server: {
        baseDir: './docs'
    }
  })
  gulp.watch('./src/sass/*.sass', styleSass);
  gulp.watch('./src/includes/*.pug', HTMLpug);
  gulp.watch('./src/**/*.pug', HTMLpug);
}

exports.watch = watch; //for gulp watch start
gulp.task('default', function () {
	watch(); //for gulp start
})