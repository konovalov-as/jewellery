"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore")
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlValidator = require('gulp-w3c-html-validator');
var ghPages = require("gulp-gh-pages");
var concat = require("gulp-concat");
var ttf2woff = require("gulp-ttf2woff");
var ttf2woff2 = require("gulp-ttf2woff2");
var pug = require("gulp-pug");
var autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      grid: "autoplace",
      browsers: autoprefixBrowsers,
    })]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("ttf2woff", function () {
  return gulp.src("source/fonts/*.ttf")
    .pipe(ttf2woff())
    .pipe(gulp.dest("build/fonts/"));
});

gulp.task("ttf2woff2", function () {
  return gulp.src("source/fonts/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("build/fonts/"));
});

gulp.task("fonts", gulp.parallel("ttf2woff", "ttf2woff2"));

gulp.task("views", function buildHTML() {
  return gulp.src("views/*.pug")
  .pipe(pug({
    // Your options in here.
  }))
});

gulp.task("scripts", function() {
  return gulp.src("source/js/lib/*.js")
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(gulp.src("source/js/main.js"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch('source/js/**/*.js', gulp.series("scripts", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/{icon-*,htmlacademy*,logo}.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("html-validator", async function () {
  gulp.src("build/**/*.html")
    .pipe(htmlValidator())
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    // "source/fonts/**/*.{woff,woff2}",
    "source//*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("deploy", function () {
  return gulp.src("build/**/*")
    .pipe(ghPages());
});

gulp.task("build", gulp.series("clean", "copy", "css", "scripts", "images", "webp", "sprite", "fonts", "html"));
gulp.task("start", gulp.series("build", "server"));
