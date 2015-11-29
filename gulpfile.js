var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('assets', ['tpl', 'jade', 'stylus', 'js']);

gulp.task('watch', ['assets'], function () {
	gulp.watch(['./app/tpl/**/*.jade'], ['tpl']);
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./app/stylus/**/*.styl'], ['stylus']);
	gulp.watch(['./app/js/**/*.js'], ['js']);
	gulp.watch(['./app/img/**/*.png'], ['imagemin']);
});

gulp.task('test', ['lint']);
gulp.task('default', ['connect', 'watch']);
