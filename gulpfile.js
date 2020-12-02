const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH} = require('./gulp.config');

sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( 'dist/**/*', { read: false }).pipe( rm() );
});

task( 'copy:html', () => {
    return src( 'src/*.html')
        .pipe(dest(DIST_PATH))
        .pipe(reload({stream: true}));
});

task( 'styles', () => {
    return src('src/styles/main.scss')
        .pipe(gulpif(env == 'dev', sourcemaps.init()))    
        .pipe(concat("main.min.scss"))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(gulpif(env == 'dev', 
            autoprefixer({
                cascade: false
            }))
        )
        .pipe(gulpif(env == 'prod', gcmq()))
        .pipe(gulpif(env == 'prod', cleanCSS()))
        .pipe(gulpif(env == 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({stream: true}));
});

    //"node_modules/jquery/dist/jquery.js",
task('scripts', () => {
    return src('src/scripts/*.js')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', {newLine: ';'}))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true })
    );
});

task("icons", () => {
    return src('src/img/icons/*.svg')
        .pipe(dest("dist/img/icons"));
});

task("images", () => {
    return src('src/img/**/*')
        .pipe(dest("dist/img"));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: DIST_PATH
        },
        open: false
    });
});

task("watch", () => {
    watch('./src/styles/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/scripts/*.js', series('scripts'));
    watch('./src/img/icons/*.svg', series('icons'));
    watch('./src/img/**/*', series('images'));
});

task(
    "default", 
    series(
        "clean", 
        parallel("copy:html", "styles", "scripts", "icons", "images"), 
        parallel("watch", "server")
    )
);

task(
    "build",
    series("clean", parallel("copy:html", "styles", "scripts", "icons", "images"))
);