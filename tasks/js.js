var gulp = require('gulp'),
	connect = require('gulp-connect'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

gulp.task('js', function () {
	gulp.src('./app/js/**/*.js')
		//.pipe(changed('./public/js', { extension: '.js' }))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/js'))
		.pipe(connect.reload());
});