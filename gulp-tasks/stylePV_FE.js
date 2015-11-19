// People Smart FE tasks ==============================================================================
'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rimraf = require('rimraf'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	size = require('gulp-size'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('============ PV_FE ============', ['serverPV', 'stylePV_FE']);

// Browser Sync 
var config = {
	proxy: {
		target: 'http://pv-local.psm.local',
		ws: true
	},
	online: true,
	open: 'ui',
	tunnel: 'vkarenko',
	host: 'localhost',
	port: 8080,
	logPrefix: 'PS'
};
gulp.task('serverPV', function() {
	browserSync(config);
});


var paths = {
	build: {
		css: 'peoplesmart/FrontEndWeb/Content/PV/css/'
	},
	src: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PV/scss/**/*.scss'
	},
	watch: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PV/scss/**/*.scss',
		style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/*.scss'
	},
	clean: './peoplesmart/FrontEndWeb/Content/PV/css'
};

gulp.task('cleanPV_FE', function(cb) {
	rimraf(paths.clean, cb);
});

gulp.task('stylePV_FE', function() {
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
// ====================================================================================================
