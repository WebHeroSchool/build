const gulp = require( 'gulp' ),
      babel = require( 'gulp-babel' ),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      cssnano = require('gulp-cssnano');

gulp.task( 'time', () => {
  let date = new Date;

  console.log( "Текущее время: " + date.getHours() + ":" + date.getMinutes() );
} );

gulp.task( 'build-js', () => {
  return gulp.src( 'scripts/*.js' )
    .pipe( concat( 'index.min.js' ) )
    .pipe( babel({
      presets: ['@babel/env']
    }))
    .pipe( uglify() )
    .pipe( gulp.dest('build/scripts') );
} );

gulp.task( 'build-css', () => {
  return gulp.src( 'styles/*.css' )
    .pipe( concat( 'index.min.css' ) )
    .pipe(cssnano())
    .pipe( gulp.dest('build/styles') );
} );

gulp.task( 'build', [ 'build-js', 'build-css'] );