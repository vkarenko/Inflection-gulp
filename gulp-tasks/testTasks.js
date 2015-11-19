'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rimraf = require('rimraf'),
	sassInheritance = require('gulp-sass-inheritance'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	size = require('gulp-size'),
	cached = require('gulp-cached'),
	gulpif = require('gulp-if'),
	filter = require('gulp-filter'),
	// prefixer = require('gulp-autoprefixer'),		// add vendor prefixes
	// cssmin = require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('sass', function() {
		return gulp.src('peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/*.scss')
			.pipe(plumber())

			//filter out unchanged scss files, only works when watching
			.pipe(gulpif(global.isWatching, cached('scss')))

			//find files that depend on the files that have changed
			.pipe(sassInheritance({dir: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/'}))

			//filter out internal imports (folders and files starting with "_" )
			.pipe(filter(function (file) {
				return !/\/_/.test(file.path) || !/^_/.test(file.relative);
				console.log(file.path + ',' + file.relative);
			}))

			//process scss files
			// .pipe(sourcemaps.init())
			.pipe(sass())
			// .pipe(sourcemaps.write('maps'))
			.pipe(size({
				showFiles: true
			}))

			//save all the files
			.pipe(gulp.dest('peoplesmart/FrontEndWeb/Content/PS/css/'));
});
gulp.task('setWatch', function() {
		global.isWatching = true;
});
gulp.task('watch', ['setWatch', 'sass'], function() {
		//your watch functions...
});