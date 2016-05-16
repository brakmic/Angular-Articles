const gulp       = require("gulp");
const del        = require("del");
const typescript = require("gulp-typescript");
const tslint     = require("gulp-tslint");
const sourcemaps = require("gulp-sourcemaps");
const tscConfig  = require("./tsconfig.json");
const rename     = require("gulp-rename");

// clean the contents of the distribution directory
gulp.task("clean", function () {
  return del("dist/**/*");
});

// copy dependencies
gulp.task("copy:libs", ["clean"], function() {
  return gulp.src([
      "node_modules/bows/dist/bows.min.js",
      "node_modules/random-js/lib/random.min.js",
      "node_modules/domready/ready.min.js",
      "node_modules/angular2/bundles/angular2-polyfills.js",
      "node_modules/systemjs/dist/system.src.js",
      "node_modules/rxjs/bundles/Rx.js",
      "node_modules/angular2/bundles/angular2.dev.js",
      "node_modules/angular2/bundles/http.dev.js",
      "node_modules/jquery/dist/jquery.min.js",
      "app/vendor/datatables/datatables.min.js",
      "node_modules/angular2/bundles/router.dev.js"
    ])
    .pipe(gulp.dest("dist/lib"));
});

//assets
gulp.task("copy:assets", ["clean"], function() {
  return gulp.src(["app/**/*.css",
                  "app/**/*.html",
                  "!app/**/*.ts",
                  "styles/**/*"],
                  { base : "./" })
    .pipe(gulp.dest("dist"));
});

// copy index_gulp.html file (it contains paths for running in a web-server)
gulp.task("copy:indexFile", ["clean"], function() {
  return gulp.src(["index_gulp.html"])
      .pipe(rename("index.html"))
      .pipe(gulp.dest("dist"));
});
// linting
gulp.task("tslint", function() {
  return gulp.src("app/**/*.ts")
    .pipe(tslint())
    .pipe(tslint.report("verbose"));
});

// compile
gulp.task("compile", ["clean"], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/app"));
});

gulp.task("build", ["compile", "copy:libs", "copy:assets", "copy:indexFile"]);
gulp.task("default", ["build"]);
