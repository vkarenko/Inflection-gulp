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
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

var paths = {
	build: {
		css: 'peoplesmart/MemberWeb/Content/PS/css/',
		css_custom: 'peoplesmart/MemberWeb/Content/Base/css/pages/report/',
		css_base: 'peoplesmart/MemberWeb/Content/Base/css/'
	},
	src: {
		style: 'peoplesmart/MemberWeb/ContentBuild/PS/scss/**/*.scss',
		custom: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/pages/report/report.L.scss',
		style_base: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/**/*.scss'
	},
	watch: {
		style: 'peoplesmart/MemberWeb/ContentBuild/PS/scss/**/*.scss',
		style_base: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/**/*.scss',
		style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/*.scss',
		_style: 'peoplesmart/MemberWeb/ContentBuild/PS/scss/**/_*.scss',
		_style_base: 'peoplesmart/MemberWeb/ContentBuild/Base/scss/**/_*.scss',
		_style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/_*.scss'
	},
	clean: {
		css: 'peoplesmart/MemberWeb/Content/PS/css',
		css_base: 'peoplesmart/MemberWeb/Content/Base/css'
	}
};

gulp.task('=========== TEST ===========', ['PS_MA_TEST_build', 'watch_PS_MA_PARTIAL']);

// Browser Sync 
gulp.task('test_SERVER', function() {
	browserSync.init({
		proxy: {
			target: 'http://ps-local.psm.local',
			ws: true
		},
		online: true,
		browser: ['d:/install/chrome-win32/chrome.exe', 'firefox'],
		//open: 'ui',
		tunnel: 'vkarenko',
		host: 'localhost',
		port: 8080,
		logPrefix: 'PS'
	});
});
gulp.task('test_SERVER_files', function() {
	browserSync.init({
		proxy: {
			target: 'http://ps-local.psm.local',
			ws: true
		},
		online: true,
		//files: ['c:/projects/peoplesmart/MemberWeb/Content/PS/css/**/*.css', 'c:/projects/peoplesmart/MemberWeb/Scripts/**/*.js', 'c:/projects/peoplesmart/MemberWeb/Views/**/*.cshtml'],
		files: ['c:/projects/peoplesmart/MemberWeb/Content/PS/css/**/*.css'],
		browser: ['d:/install/chrome-win32/chrome.exe', 'firefox'],
		//open: 'ui',
		tunnel: 'vkarenko',
		host: 'localhost',
		port: 8080,
		logPrefix: 'PS'
	});
});


// build PS Member styles
gulp.task('PS_MA_TEST_build', function() {
	gulp.src(paths.src.style)
		.pipe(watch([paths.watch.style, paths.watch.style_STORM]))
		.pipe(plumber())
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


gulp.task('PS_MA_reload', function() {
	gulp.src(paths.src.style)
		.pipe(watch([paths.watch.style, paths.watch.style_STORM]).on('change', reload))
		.pipe(plumber())
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
gulp.task('PS_MA_TEST_RELOAD', ['test_SERVER', 'PS_MA_reload']);

// Partials
gulp.task('PS_MA_PARTIAL', function() {
	gulp.src(paths.src.custom)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('/peoplesmart/MemberWeb/Content/PS/css/maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css_custom));
});

gulp.task('watch_PS_MA_PARTIAL', function() {
	watch([paths.watch._style, paths.watch._style_base, paths.watch._style_STORM], function(event, cb) {
		gulp.start('PS_MA_PARTIAL');
	});
});