const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('minify-css', ['css'], () => {
    return gulp.src('src/css/bootstrap.min.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('css', ['sass'], () => {
    return gulp.src('src/css/bootstrap.css')
        .pipe(rename((path) => {
            path.basename += '.min';
            path.extname = '.css';
        }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('js', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.js.map',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery/dist/jquery.min.map',
        ])
        .pipe(gulp.dest('src/js'));
});

gulp.task('default', ['js', 'minify-css']);
