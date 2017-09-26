
const babelify     = require('babelify');
const browserify   = require('browserify');
const uglify       = require('gulp-uglify');
const buffer       = require('vinyl-buffer');
const source       = require('vinyl-source-stream');

const del = require('del');
const combine = require('stream-combiner2').obj;

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const dirs = {
  application: './server/server.js',
  public: './public/'
};

const config = {
  clean: [dirs.public]
};

gulp.task('clean', function() {
  return del(config.clean);
});

gulp.task('bundle', function () {
  return browserify(dirs.application, {debug:true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulpIf(!isDevelopment, combine(buffer())))
        .pipe(gulp.dest(dirs.public));
});

gulp.task('build',
  gulp.series('clean','bundle')
);
