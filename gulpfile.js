var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var version = '0.0.1';

function renameVersionDotMin() {
    return rename(function(path) {
        path.basename += '.' + version + '.min';
    });
}

function runJs() {
    gulp.src('./source/js/unity.js')
        .pipe(uglify())
        .pipe(renameVersionDotMin())
        .pipe(gulp.dest('./static/scripts'));
}


function runSass() {
    gulp.src('./source/sass/unity.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            sourceMap: true
        }))
        .pipe(renameVersionDotMin())
        .pipe(gulp.dest('./static/styles'));
}


gulp.task('js', runJs);
gulp.task('sass', runSass);
gulp.task('build', ['js', 'sass']);
gulp.task('watch', function() {
    gulp.watch('./source/js/unity.js', ['js']);
    gulp.watch('./source/sass/**/*.scss', ['sass']);
});
