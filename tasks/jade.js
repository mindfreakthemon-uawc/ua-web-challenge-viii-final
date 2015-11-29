var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect');

gulp.task('jade', function () {
	gulp.src('./app/jade/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});