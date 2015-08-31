var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var dest = 'unity-0.0.3';

function addDotMin() {
    return rename(function(path) {
        path.basename += '.min';
    });
}

function jsTask() {
    gulp.src('./source/js/unity.js')
        .pipe(uglify())
        .pipe(addDotMin())
        .pipe(gulp.dest('./' + dest + '/scripts'));
}

function sassTask() {
    gulp.src('./source/sass/unity.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function(err) {
                return console.error(err);
            }
        }))
        .pipe(addDotMin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./' + dest + '/styles'));
}

gulp.task('js', jsTask);
gulp.task('sass', sassTask);
gulp.task('build', ['js', 'sass']);
gulp.task('watch', function() {
    gulp.watch('./source/js/unity.js', ['js']);
    gulp.watch('./source/sass/**/*.scss', ['sass']);
});
