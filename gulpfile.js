var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');


function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString())
    this.emit('end');
}

// Styles
gulp.task('styles', function() {
  return sass('src/App.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('src'));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('default', ['watch']);
