var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    postcssGulp = require('gulp-postcss');

var filename = 'unity-2.0.0.min';

//function jsTask() {
//    gulp.src('./src/js/unity.js')
//        .pipe(uglify())
//        .pipe(addDotMin())
//        .pipe(sourcemaps.init())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./' + dest + '/script'));
//}

function watchTask() {
    gulp.watch('./src/js/unity.js', ['js']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
}

function cssTask() {

    //gulp.src('./src/scss/test.scss')
    gulp.src('./src/scss/bootstrap.scss')

        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))

        .pipe(postcssGulp([
            require('css-mqpacker')(),
            require('autoprefixer')()
        ]))

        //.pipe(require('gulp-cssnano')())

        .pipe(rename(function(path) {
            path.basename = filename;
            path.ext = 'css';
        }))

        .pipe(gulp.dest('./bin/css'));
}

//gulp.task('js', jsTask);
gulp.task('css', cssTask);
gulp.task('watch', watchTask);
gulp.task('build', ['js', 'css']);
