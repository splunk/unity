var gulp = require('gulp');
var sass = require('gulp-scss');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var dest = 'unity-2.0.0',
    splunkbase = '../splunkapps/splunkapps/static/lib';

function addDotMin() {
    return rename(function(path) {
        path.basename += '.min';
    });
}

function jsTask() {
    gulp.src('./source/js/unity.js')
        .pipe(uglify())
        .pipe(addDotMin())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./' + dest + '/script'));
}

function sassTask() {
    gulp.src('./source/scss/unity.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function(err) {
                return console.error(err);
            }
        }))
        .pipe(addDotMin())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./' + dest + '/style'));
}

function watchTask() {
    gulp.watch('./source/js/unity.js', ['js']);
    gulp.watch('./source/scss/**/*.scss', ['sass']);
}

function splunkbaseTask() {
    gulp.src(['./' + dest + '/**/*'])
        .pipe(gulp.dest(splunkbase + '/' +  dest));
}

gulp.task('js', jsTask);
gulp.task('sass', sassTask);
gulp.task('watch', watchTask);
gulp.task('splunkbase', splunkbaseTask);
gulp.task('build', ['js', 'sass']);
