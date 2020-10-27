const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger'); //для инклудов
//sass compile
function style () {
	return gulp.src('./src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      grid: true
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./docs/css'))
  .pipe(browserSync.stream())
}
function riggerHtml () {
	return gulp.src('./src/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('./docs'))
}
function watch () {
  browserSync.init({
    server: {
        baseDir: './docs'
    }
  })
	gulp.watch('./src/scss/*.scss', style);
	gulp.watch('./src/**/*.html', riggerHtml);
	gulp.watch('./docs/*.html').on('change', browserSync.reload); 
}

exports.riggerHtml = riggerHtml;
exports.watch = watch; //for gulp watch start
gulp.task('default', function () {
	watch(); //for gulp start
})