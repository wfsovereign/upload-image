var gulp = require('gulp'),
    sass = require('gulp-sass');

var scssSource = 'frontEndSource/scss/*.scss',
    jsSource = 'frontEndSource/js/*.js',
    imgSource = 'src/image/*',
    imgDest = 'public/image',
    scssDest = 'public/css',
    jsDest = 'public/js';


gulp.task('scss', function () {
    gulp.src(scssSource)
        .pipe(sass())
        .pipe(gulp.dest(scssDest));
});

gulp.task('js', function () {
    gulp.src(jsSource)
        .pipe(gulp.dest(jsDest))
});

gulp.task('img',function (){
    gulp.src(imgSource)
        .pipe(gulp.dest(imgDest))
});


gulp.task('default', ['scss','js','img'], function () {
    console.log("gulp build success.");
});

gulp.task('watch', ['scss','js','img'], function () {
    gulp.watch(scssSource, ['scss']);
    gulp.watch(jsSource, ['js']);
    gulp.watch(jsSource, ['img']);
});
