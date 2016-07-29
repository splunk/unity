const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

function watchTask() {
    gulp.start('build');
    gulp.watch('./src/**/*.scss', ['build']);
}

function buildTask() {
    gulp.src('./src/bootstrap.scss')
        // build
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({browsers: ['> 1%']}),
            mqpacker()
        ]))
        
        // uncompressed
        .pipe(rename(function(path) {
            path.basename = 'unity';
            path.ext = 'css';
         }))        
        .pipe(gulp.dest('./bin'))
        
        // compressed
        .pipe(cssnano())
        .pipe(rename(function(path) {
            path.basename = 'unity.min';
            path.ext = 'css';
         }))
        .pipe(sourcemaps.write('.'))         
        .pipe(gulp.dest('./bin'));
}

gulp.task('watch', watchTask);
gulp.task('build', buildTask);
