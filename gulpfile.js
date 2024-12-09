const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const webpack = require('webpack-stream');

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

gulp.task('clean', function(done){
    if(fs.existsSync('./dist/')){
        return gulp.src('./dist/').pipe(clean())
    }

    done();
})

gulp.task('watch', function(){
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('img'));
})

gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('data', function(){
    return gulp.src('./src/data/**/*.json')
        .pipe(gulp.dest('./dist/data'))
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'img', 'js', 'data'),
    gulp.parallel('start', 'watch'),
))