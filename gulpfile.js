import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import squoosh from 'gulp-libsquoosh';
import { stacksvg } from 'gulp-stacksvg';
import svgo from 'gulp-svgmin';
import htmlmin from 'gulp-htmlmin';
import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/*.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      minmax(),
      autoprefixer(),
      csso({ restructure: false })
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const earlyLoadScripts = () => {
  return gulp.src('source/js/early/*.js')
    .pipe(concat('early-scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

const lateLoadScripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(concat('late-scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

const scripts = gulp.parallel(earlyLoadScripts, lateLoadScripts);

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

// WebP

export const createWebp = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*', '!source/img/background-promo-desktop*.jpg'])
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () =>
  gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo({
      plugins: [
        'preset-default',
        'removeDimensions',
        {
          removeViewBox: false,
        },
        {
          cleanupIDs: false,
        }
      ],
    }))
    .pipe(gulp.dest('build/img'));

const spriteNoMask = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Создаём отдельный спрайт для SVG, используемых в mask-image, чтобы CORS не вызывал вторичное скачивание спрайта
const spriteMask = () => {
  return gulp.src('source/img/icons/mask/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite-mask.svg'))
    .pipe(gulp.dest('build/img'));
}

const sprite = gulp.parallel(spriteNoMask, spriteMask);

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  )
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

// Restart

export const restart = gulp.series(
  server,
  watcher
);
