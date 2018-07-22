let gulp = require('gulp');
let cleanCss = require('gulp-clean-css');

gulp.task('minifyCss', () => {
    return gulp.src('css/*.css')
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipi(concat('style.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyJS', () => {
    return gulp.src('js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['minifCss', 'minifyJS']);