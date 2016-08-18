// Good Hire MA tasks ==============================================================================
'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rimraf = require('rimraf'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	size = require('gulp-size'),
	autoprefixer = require('gulp-autoprefixer'),
	pixrem = require('gulp-pixrem');




var browsers = ["last 2 versions", "> 1%", "opera 12.1", 'ie 9'];




var paths = {
	build: {
		css: 'gh/MemberWeb/ContentOutput/css',
		cssMVC: 'gh/MemberWeb/ContentOutput/css/mvc/pages/'
	},
	src: {
		style: 'gh/MemberWeb/ContentBuild/scss/**/*.scss',
		styleMVC: 'gh/MemberWeb/ContentBuild/scss/mvc/pages/*.scss'
	},
	watch: {
		style: 'gh/MemberWeb/ContentBuild/scss/**/*.scss',
		common: 'gh/SCSSCommon/**/*.scss'
	},
	clean: 'gh/MemberWeb/ContentOutput/css/*'
};

gulp.task('============ GH_MA ============', ['clear_GH_MA', 'style_GH_MA']);

gulp.task('clear_GH_MA', function(cb) {
	rimraf(paths.clean, cb);
});

gulp.task('style_GH_MA', function() {
	gulp.src(paths.src.style)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		//.pipe(autoprefixer({browsers: browsers}))
		//.pipe(pixrem('16px', {browsers: browsers}))
		.pipe(sourcemaps.write())
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css));
});

gulp.task('watch_GH_MA', function() {
	watch([paths.watch.style, paths.watch.common], function(event, cb) {
		//gulp.start(['style_GH_MA', 'style_GH_MA_MVC']);
		gulp.start(['style_GH_MA_MVC']);
	});
});


gulp.task('style_GH_MA_MVC', function() {
	gulp.src(paths.src.styleMVC)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		//.pipe(autoprefixer({browsers: browsers}))
		//.pipe(pixrem('16px', {browsers: browsers}))
		.pipe(sourcemaps.write())
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.cssMVC));
});
// ====================================================================================================
