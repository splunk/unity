var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var version = '0.0.3';

function renameToVersionDotMin() {
    return rename(function(path) {
        path.basename += '.' + version + '.min';
    });
}

function runJs() {
    gulp.src('./source/js/unity.js')
        .pipe(uglify())
        .pipe(renameToVersionDotMin())
        .pipe(gulp.dest('./static/scripts'));
}


function runSass() {
    gulp.src('./source/sass/unity.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function(err) {
                return console.error(err);
            }
        }))
        .pipe(renameToVersionDotMin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/styles'));
}


gulp.task('js', runJs);
gulp.task('sass', runSass);
gulp.task('build', ['js', 'sass']);
gulp.task('watch', function() {
    gulp.watch('./source/js/unity.js', ['js']);
    gulp.watch('./source/sass/**/*.scss', ['sass']);
});
