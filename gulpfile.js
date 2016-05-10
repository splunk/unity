'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const postcssGulp = require('gulp-postcss');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

const filename = 'unity-2.0.0.min';

//function jsTask() {
//    gulp.src('./src/js/unity.js')
//        .pipe(uglify())
//        .pipe(addDotMin())
//        .pipe(sourcemaps.init())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./' + dest + '/script'));
//}

function watchTask() {
    gulp.start('css');
    gulp.watch('./src/**/*.scss', ['css']);
}

function cssTask() {

    gulp.src('./src/splunkbase/sass/bootstrap.scss')

        .pipe(sass().on('error', sass.logError))

        .pipe(postcssGulp([
            require('autoprefixer')()
            // postcssMpc(),
            // postcssMqPacker()
        ]))

        // .pipe(cssnano())

        .pipe(rename(function(path) {
            path.basename = 'splunkbase';
            path.ext = 'css';
        }))

        .pipe(gulp.dest('./bin/css'));
}

//gulp.task('js', jsTask);
gulp.task('css', cssTask);
gulp.task('watch', watchTask);
gulp.task('build', ['css']);
