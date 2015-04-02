var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var version = '0.0.1';

//gulp.task('build', function() {
//    gulp.src('static/pegasus.js')
//        .pipe(uglify())
//        .pipe(rename(function(path) {
//            path.basename += '.' + version;
//            path.extname = '.min.js'
//        }))
//        .pipe(gulp.dest('static'));
//});

gulp.task('sass', function () {
    gulp.src('./sass/unity.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            sourceMap: true
        }))
        .pipe(rename(function(path) {
            path.basename += '.' + version;
        }))
        .pipe(gulp.dest('./static/styles'));
});

