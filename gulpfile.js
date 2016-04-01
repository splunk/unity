var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('postcss');
var postcssGulp = require('gulp-postcss');
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
    //gulp.watch('./src/js/unity.js', ['js']);
    cssTask();
    gulp.watch('./src/css/**/*.css', ['css']);
}

function cssTask() {

    gulp.src('./src/css/bootstrap.css')
    // gulp.src('./src/scss/bootstrap.scss')
    //
    // .pipe(sass({
    //     outputStyle: 'expanded'
    // }).on('error', sass.logError))

    .pipe(postcssGulp([
        require('postcss-import')(),
        require('./src/js/postcss-mpc')()
        // require('css-mqpacker')()
        // require('postcss-cssnext')()
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
gulp.task('build', ['css']);
