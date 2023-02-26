const { src, dest } = require("gulp");
const gulp = require("gulp");

// Common Dependencies
const del = require("del");
const browserSync = require("browser-sync");
const fileinclude = require("gulp-file-include");
const plumber = require("gulp-plumber");

// CSS Dependencies
const autoprefixer = require("gulp-autoprefixer");
const cssbeutify = require("gulp-cssbeautify");
const cssnano = require("gulp-cssnano");
const removeComments = require("gulp-strip-css-comments");
const sass = require("gulp-sass")(require("sass"));

// JS Dependencies
const uglify = require("gulp-uglify");
const rigger = require("gulp-rigger");

// IMG Dependencies
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");

// Paths
const distPath = "dist/";
const srcPath = "src/";
const htmlPath = "html/";
const assetsPath = "assets/";

const path = {
  // Build - папка dist
  build: {
    html: distPath,
    css: distPath + "assets/css/",
    js: distPath + "js/",
    images: distPath + "assets/img/",
    fonts: distPath + "assets/fonts/",
  },
  // Src - исходники
  src: {
    html: htmlPath + "**/*.html",
    css: assetsPath + "scss/*.scss",
    js: srcPath + "*.js",
    imgaes: assetsPath + "img/**/*.{jpeg,webp,png,svg,ico}",
    fonts: assetsPath + "fonts/**/*.{woff,eot,woff2,ttf}",
  },
  // Watch - отслеживание изменений в файлах для обновления
  watch: {
    html: htmlPath + "**/*.html",
    css: assetsPath + "scss/**/*.scss",
    js: srcPath + "**/*.js",
    images: assetsPath + "img/**/*.{jpeg,webp,png,svg,ico}",
    fonts: assetsPath + "fonts/**/*.{woff,eot,woff2,ttf}",
  },
  // Clean - очистка папки dist
  clean: "./" + distPath,
};

// Tasks
function html() {
  return src(path.src.html, { base: htmlPath })
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return src(path.src.css, { base: assetsPath + "scss/" })
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeutify())
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(
      cssnano({
        zindex: false,
        discardComments: { removeAll: true },
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
}
function js() {
  return src(path.src.js, { base: srcPath })
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return src(path.src.imgaes, { base: assetsPath + "img/" })
    .pipe(imagemin())
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src(path.src.fonts, { base: assetsPath + "fonts/" }).pipe(
    browserSync.reload({ stream: true })
  );
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
  });
}

const build = gulp.series(clean, gulp.parallel([html, css, js, images, fonts]));
const watch = gulp.parallel(build, watchFiles, serve);

module.exports = {
  clean,
  build,
  run: watch,
};
