var gulp = require("gulp");
var concat = require("gulp-concat");
var config = require('../config').concat;
const uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');

gulp.task("concat", function() {
  var files = config.libs;
  gulp.src(files)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(config.dest));
});


gulp.task("concat-min", function() {
  var files = config.libs;
  gulp.src(files)
    .pipe(concat('lib.js'))
    .pipe(uglify({output: {comments: saveLicense}}))
    .pipe(gulp.dest('../../docs/01/assets/js'));
});
