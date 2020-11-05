const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
//sass compile
function style () {
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

function pugMainHTMLs () {
  return gulp.src('./src/*.pug')
  .pipe(pug({
      pretty: true
  }))
  .pipe(gulp.dest('./docs/'))
}
function pugVideos () {
  return gulp.src('./src/videos/*.pug')
  .pipe(pug({
      pretty: true
  }))
  .pipe(gulp.dest('./docs/videos/'))
}

function watch () {
  browserSync.init({
    server: {
        baseDir: './docs'
    }
  })
  gulp.watch('./src/sass/*.sass', style);
  gulp.watch('./src/*.pug', pugMainHTMLs);
  gulp.watch('./src/includes/*.pug', pugMainHTMLs);
  gulp.watch('./src/videos/*.pug', pugVideos);
  gulp.watch('./src/includes/*.pug', pugVideos);
	gulp.watch('./docs/**/*.html').on('change', browserSync.reload); 
}

exports.watch = watch; //for gulp watch start
gulp.task('default', function () {
	watch(); //for gulp start
})