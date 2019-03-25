const gulp = require( 'gulp' ),
      babel = require( 'gulp-babel' ),
      concat = require( 'gulp-concat' ),
      uglify = require( 'gulp-uglify' ),
      cssnano = require( 'gulp-cssnano' ),
      sourcemaps = require( 'gulp-sourcemaps '),
      browserSync = require( 'browser-sync' ).create();

const paths = {
    src: {
      styles: 'styles/*.css',
      scripts: 'scripts/*.js'
    },
    build: {
      styles: 'build/styles',
      scripts: 'build/scripts'
    },
    buildNames: {
      styles: 'index.min.css',
      scripts: 'index.min.js'
    }
};

gulp.task( 'time', () => {
  let date = new Date;

  console.log( "Текущее время: " + date.getHours() + ":" + date.getMinutes() );
} );

gulp.task( 'build-js', () => {
  return gulp.src( [paths.src.scripts] )
    .pipe(sourcemaps.init())
      .pipe( concat( paths.buildNames.scripts ) )
      .pipe( babel({
        presets: ['@babel/env']
      }))
      .pipe( uglify() )
    .pipe(sourcemaps.write('../maps'))
    .pipe( gulp.dest( paths.build.scripts ) );
} );

gulp.task( 'build-css', () => {
  return gulp.src( [paths.src.styles] )
    .pipe(sourcemaps.init())
      .pipe( concat( paths.buildNames.styles ) )
      .pipe(cssnano())
    .pipe(sourcemaps.write('../maps'))
    .pipe( gulp.dest( paths.build.styles ) );
} );

gulp.task( 'default', [ 'build-js', 'build-css'] );

gulp.task( 'browserSync', () => {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });

  gulp.watch( 'scripts/*.js', ['js-watch'] );
  gulp.watch( 'styles/*.css', ['css-watch'] );
} );

gulp.task( 'js-watch', [ 'build-js' ], () => browserSync.reload() );
gulp.task( 'css-watch', [ 'build-css' ], () => browserSync.reload() );