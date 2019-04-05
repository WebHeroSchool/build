const env = require( 'gulp-env' ),
      gulp = require( 'gulp' ),
      clean = require( 'gulp-clean' ),
      babel = require( 'gulp-babel' ),
      concat = require( 'gulp-concat' ),
      uglify = require( 'gulp-uglify' ),
      gulpif = require( 'gulp-if' ),
      nested = require( 'postcss-nested' ),
      short = require( 'postcss-short' ),
      assets = require( 'postcss-assets' ),
      postcssPresetEnv = require('postcss-preset-env'),
      autoprefixer = require( 'autoprefixer' ),
      postcss = require( 'gulp-postcss' ),
      cssnano = require( 'gulp-cssnano' ),
      sourcemaps = require( 'gulp-sourcemaps' ),
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

env({
  file: '.env',
  type: 'ini',
});

gulp.task( 'time', () => {
  let date = new Date();

  console.log( "Текущее время: " + date.getHours() + ":" + date.getMinutes() );
} );

gulp.task( 'build-js', () => {
  return gulp.src( [paths.src.scripts] )
    .pipe(sourcemaps.init())
      .pipe( concat( paths.buildNames.scripts ) )
      .pipe( babel({
        presets: ['@babel/env']
      }))
      .pipe( gulpif(process.env.NODE_ENV === 'production', uglify())  )
    .pipe(sourcemaps.write('../maps'))
    .pipe( gulp.dest( paths.build.scripts ) );
} );

gulp.task( 'build-css', () => {
  const plugins = [
    nested,
    short,
    assets({
      loadPaths: ['./images'],
      relativeTo: 'src/styles',
    }),
    postcssPresetEnv(/* pluginOptions */),
    autoprefixer({
      browsers: ['last 1 version']
    }),
  ];

  return gulp.src( [paths.src.styles] )
    .pipe( sourcemaps.init() )
    .pipe( postcss(plugins) )
      .pipe( concat( paths.buildNames.styles ) )
      .pipe( gulpif(process.env.NODE_ENV === 'production', cssnano() )  )
    .pipe( sourcemaps.write( '../maps') )
    .pipe( gulp.dest( paths.build.styles ) );
} );

gulp.task( 'build', [ 'build-js', 'build-css'] );

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

gulp.task('clean-build', () => {
  return gulp.src('./build', {read: false})
    .pipe(clean());
});

gulp.task( 'default', ['build'] );
gulp.task( 'dev', ['build', 'browserSync'] );
gulp.task( 'prod', ['build'] );

