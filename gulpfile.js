const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
}

gulp.task('html', function(){
    return gulp
        .src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function(){
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function(){
    return gulp.src(`./src/images/**/*`, {encoding: false})
    .pipe(gulp.dest(`./dist/images`));
})

const serverSettings = {
    livereload: true,
    open: true,
}

gulp.task('start', function(){
    return gulp.src('./dist/').pipe(server(serverSettings))
})