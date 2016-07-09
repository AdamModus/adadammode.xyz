var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;
// var wiredep = require('wiredep').stream;

var bowerConfigs = {
    directory: 'app/bower_components',
    exclude: [
        'react/'
    ]
};

// where all the files are
var src = {
    scss: 'app/style/sass/**/*.scss',
    css: 'app/style/css',
    html: 'app/**/*.html',
    js: 'app/js/**/*.js'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    // start browserSync
    browserSync({
        // root folder
        server: "./app",
        // used port
        port: 8181
    });

});

// Compile sass into CSS
gulp.task('sass', function () {
    gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({
            stream: true
        }));
});

// // inject bower components
// gulp.task('wiredep', function () {
//     gulp.src('app/style/*.css')
//         .pipe(wiredep(bowerConfigs))
//         .pipe(gulp.dest('app/style'));
//
//     gulp.src('app/index.html')
//         .pipe(wiredep(bowerConfigs))
//         .pipe(gulp.dest('app'));
// });

gulp.task('watch', function () {
    gulp.watch(src.scss, ['sass']);
    gulp.watch([src.html, src.js]).on('change', reload);
    gulp.watch('bower.json', ['wiredep']);
});


gulp.task('default', ['sass', 'serve'], function () {
    gulp.start('watch');
});