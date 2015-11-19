// People Smart MA tasks ==============================================================================
'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rimraf = require('rimraf'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	size = require('gulp-size'),
	// prefixer = require('gulp-autoprefixer'),		// add vendor prefixes
	// cssmin = require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var paths = {
	build: {
		css: 'peoplesmart/MemberWeb/Content/PS/css/',
		css_base: 'peoplesmart/MemberWeb/Content/Base/css/'
	},
	src: {
		style: 'peoplesmart/MemberWeb/ContentBuild/PS/scss/**/*.scss',
		style_base: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/**/*.scss'
	},
	watch: {
		style: 'peoplesmart/MemberWeb/ContentBuild/PS/scss/**/*.scss',
		style_base: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/**/*.scss',
		style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/*.scss'
	},
	clean: {
		css: 'peoplesmart/MemberWeb/Content/PS/css',
		css_base: 'peoplesmart/MemberWeb/Content/Base/css'
	}
};


gulp.task('============ PS_MA ============', ['serverPS', 'stylePS_MA', 'stylePS_MA_Base']);

gulp.task('clear_PS_MA', function(cb) {
	rimraf(paths.clean.css, cb);
});

// build PS Member styles
gulp.task('stylePS_MA', function() {
	gulp.src(paths.src.style)
		.pipe(plumber())
		.pipe(watch([paths.watch.style, paths.watch.style_STORM]).on('change', reload))
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css));
});

gulp.task('cleanPS_MA_base', function(cb) {
	rimraf(paths.clean.css_base, cb);
});
// build PS Member Base styles
gulp.task('stylePS_MA_Base', function() {
	gulp.src(paths.src.style_base)
		.pipe(plumber())
		.pipe(watch([paths.watch.style_base, paths.watch.style_STORM]).on('change', reload))
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css_base));
});
// ====================================================================================================
