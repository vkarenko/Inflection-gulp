// Good Hire FE tasks ==============================================================================
'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rimraf = require('rimraf'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	size = require('gulp-size'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;



var browsers = ["last 2 versions", "> 1%", "opera 12.1", 'ie 9'];



// Browser Sync 
gulp.task('GH_SERV', function() {
	browserSync.init({
		proxy: 'http://gh-local.inflection.net',
		port: 8080,
		host: 'gh-local.inflection.net',
		open: 'ui',
		//files: ['gh/FrontEndWeb/ContentOutput/css/**/*.css', 'gh/MemberWeb/ContentOutput/css/**/*.css'],
		files: 'gh/MemberWeb/ContentOutput/css/**/*.css',
		browser: 'c:/install/chrome-win32/chrome.exe',
		//codeSync: false,
		//online: true,
		//tunnel: 'vkarenko',
		logPrefix: 'GH'
	})
});


var paths = {
	build: {
		css: 'gh/FrontEndWeb/ContentOutput/css',
		cssMVC: 'gh/FrontEndWeb/ContentOutput/css/mvc/pages/'
	},
	src: {
		style: 'gh/FrontEndWeb/ContentBuild/scss/**/*.scss',
		styleMVC: 'gh/FrontEndWeb/ContentBuild/scss/mvc/pages/*.scss'

	},
	watch: {
		style: 'gh/FrontEndWeb/ContentBuild/scss/**/*.scss',
		common: 'gh/SCSSCommon/**/*.scss'
	},
	clean: 'gh/FrontEndWeb/ContentOutput/css/*'
};

gulp.task('============ GH_FE ============', ['clear_GH_FE', 'style_GH_FE']);

gulp.task('clear_GH_FE', function(cb) {
	rimraf(paths.clean, cb);
});

gulp.task('style_GH_FE', function() {
	gulp.src(paths.src.style)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(autoprefixer({browsers: browsers}))
		// .pipe(cssmin())
		.pipe(sourcemaps.write('gh/FrontEndWeb/ContentOutput/css/maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css));
});

gulp.task('style_GH_FE_MVC', function() {
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

gulp.task('watch_GH_FE', function() {
	watch([paths.watch.style, paths.watch.common], function(event, cb) {
		gulp.start('style_GH_FE');
	});
});
// ====================================================================================================
