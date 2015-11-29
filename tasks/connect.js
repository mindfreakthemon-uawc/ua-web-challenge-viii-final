var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function () {
	connect.server({
		root: ['public'],
		host: '127.0.0.1',
		port: 8443,
		livereload: true
	});
});
