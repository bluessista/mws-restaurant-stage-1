let gulp = require('gulp');
let cleanCss = require('gulp-clean-css');
let concat = require('gulp-concat');
let postCss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let imagemin = require('gulp-imagemin');

gulp.task('minifyCss', () => {
    return gulp.src('css/*.css')
        .pipe(postCss([autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })]))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyJS', () => {
    return gulp.src('js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('minifyImages', () => {
    return gulp.src('img/*.jpg')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('default', ['minifyCss', 'minifyJS', 'minifyImages']);