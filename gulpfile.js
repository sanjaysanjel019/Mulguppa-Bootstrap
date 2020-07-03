'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass')
const browserSync = require('browser-sync');
const del = require('del')
const imagemin = require('gulp-imagemin')


gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
})


gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
})




gulp.task('browser-sync', function () {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch')
})

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function ()
    {
        gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./dist/fonts'))
    }
)

gulp.task('imagemin', function ()
{
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imgemin({optimizationLevel:3,progressive:true,interlaced:true}))
    .pipe(gulp.dist('/dist/img'))
})

gulp.task('build', ['clean'], function ()
{
    gulp.start('copyfonts', 'imagemin');
})