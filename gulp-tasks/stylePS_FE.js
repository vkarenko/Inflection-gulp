// People Smart FE tasks ==============================================================================
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



// Browser Sync 
var config = {
	proxy: {
		target: 'http://ps-local.psm.local',
		ws: true
	},
	online: true,
	open: 'ui',
	tunnel: 'vkarenko',
	host: 'localhost',
	port: 8080,
	logPrefix: 'PS'
};
gulp.task('serverPS', function() {
	browserSync(config);
});


var paths = {
	build: {
		css: 'peoplesmart/FrontEndWeb/Content/PS/css/'
	},
	src: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/*.scss'
	},
	watch: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/*.scss',
		style_: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/_*.scss',
		style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/*.scss'
	},
	clean: 'peoplesmart/FrontEndWeb/Content/PS/css'
};

gulp.task('============ PS_FE ============', ['serverPS', 'stylePS_FE', 'watch_stylePS']);

gulp.task('clear_PS_FE', function(cb) {
	rimraf(paths.clean, cb);
});

gulp.task('stylePS_FE', function() {
	gulp.src(paths.src.style)
		.pipe(watch([paths.watch.style, paths.watch.style_STORM]))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		// .pipe(prefixer())
		// .pipe(cssmin())
		.pipe(sourcemaps.write('maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css));
});
gulp.task('watch_stylePS', function(){
	watch([paths.watch.style_], function(event, cb) {
		gulp.start('stylePS_FE');
	});
});
// ====================================================================================================
