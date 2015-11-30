// People Smart FE tasks ==============================================================================
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



// Browser Sync 
gulp.task('serverPS', function() {
	browserSync.init({
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
	})
	//browserSync(config);
});


var paths = {
	build: {
		css: 'peoplesmart/FrontEndWeb/Content/PS/css/',
		css_custom: 'peoplesmart/FrontEndWeb/Content/PS/css/pages/Default/'
	},
	src: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/*.scss',
		custom: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/pages/Default/defaultName.scss'
	},
	watch: {
		style: 'peoplesmart/FrontEndWeb/ContentBuild/PS/scss/**/*.scss',
		style_partials: 'peoplesmart/FrontEndWeb/Content/PS/scss/**/_*.scss',
		style_STORM: 'storm/Res/virtual/PS/ContentBuild/scss/**/*.scss',
		style_STORM_partials: 'storm/Res/virtual/PS/Content/scss/**/_*.scss'
	},
	clean: 'peoplesmart/FrontEndWeb/Content/PS/css'
};

gulp.task('============ PS_FE ============', ['serverPS', 'stylePS_FE', 'watch_custom_stylePS_FE']);

gulp.task('clear_PS_FE', function(cb) {
	rimraf(paths.clean, cb);
});

gulp.task('stylePS_FE', function() {
	gulp.src(paths.src.style)
		.pipe(watch([paths.watch.style, paths.watch.style_STORM]).on('change', reload))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		// .pipe(prefixer())
		// .pipe(cssmin())
		.pipe(sourcemaps.write('/peoplesmart/FrontEndWeb/Content/PS/css/maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css));
});

gulp.task('custom_stylePS_FE', function() {
	gulp.src(paths.src.custom)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			sourceMap: true,
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('/peoplesmart/FrontEndWeb/Content/PS/css/maps'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.build.css_custom));
});

gulp.task('watch_custom_stylePS_FE', function() {
	watch([paths.watch.style, paths.watch.style_STORM], function(event, cb) {
		gulp.start('custom_stylePS_FE');
	});
});
// ====================================================================================================
