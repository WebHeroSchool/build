const gulp = require( 'gulp' ),
      babel = require( 'gulp-babel' );

gulp.task( 'time', () => {
  let date = new Date;

  console.log( "Текущее время: " + date.getHours() + ":" + date.getMinutes() );
} );

gulp.task( 'build-js', () => {
  return gulp.src( 'scripts/*.js' )
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe( gulp.dest('build/scripts') );
} );

gulp.task( 'build-css', () => {
  return gulp.src( 'styles/*.css' )
    .pipe( gulp.dest('build/styles') );
} );

gulp.task( 'build', [ 'build-js', 'build-css'] );