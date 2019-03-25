const gulp = require( 'gulp' ),
      babel = require( 'gulp-babel' ),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      cssnano = require('gulp-cssnano'),
      sourcemaps = require('gulp-sourcemaps');

gulp.task( 'time', () => {
  let date = new Date;

  console.log( "Текущее время: " + date.getHours() + ":" + date.getMinutes() );
} );

gulp.task( 'build-js', () => {
  return gulp.src( 'scripts/*.js' )
    .pipe(sourcemaps.init())
      .pipe( concat( 'index.min.js' ) )
      .pipe( babel({
        presets: ['@babel/env']
      }))
      .pipe( uglify() )
    .pipe(sourcemaps.write('../maps'))
    .pipe( gulp.dest('build/scripts') );
} );

gulp.task( 'build-css', () => {
  return gulp.src( 'styles/*.css' )
    .pipe(sourcemaps.init())
      .pipe( concat( 'index.min.css' ) )
      .pipe(cssnano())
    .pipe(sourcemaps.write('../maps'))
    .pipe( gulp.dest('build/styles') );
} );

gulp.task( 'default', [ 'build-js', 'build-css'] );