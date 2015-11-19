// // People Smart MA tasks ==============================================================================
// 'use strict';

// var gulp = require('gulp'),
// 	plumber = require('gulp-plumber'),
// 	rimraf = require('rimraf'),
// 	watch = require('gulp-watch'),
// 	sass = require('gulp-sass'),
// 	compass = require('gulp-compass'),
// 	sourcemaps = require('gulp-sourcemaps'),
// 	size = require('gulp-size'),
// 	// prefixer = require('gulp-autoprefixer'),		// add vendor prefixes
// 	// cssmin = require('gulp-minify-css'),
// 	browserSync = require('browser-sync'),
// 	reload = browserSync.reload;

// var paths = {
// 	build: {
// 		css: 'peoplesmart/MemberWeb/Content/PS/css/',
// 		css_base: 'peoplesmart/MemberWeb/Content/Base/css/'
// 	},
// 	src: {
// 		style: 'peoplesmart/MemberWeb/Content/PS/scss',
// 		img: 'peoplesmart/MemberWeb/Content/PS/img',
// 		style_base: 'peoplesmart/MemberWeb/Content/Base/scss/**/*.scss'
// 	},
// 	watch: {
// 		style: 'peoplesmart/MemberWeb/Content/PS/scss/**/*.scss',
// 		style_base: 'peoplesmart/MemberWeb/Content/Base/scss/**/*.scss',
// 		style_STORM: 'storm/Res/virtual/PS/Content/scss/**/*.scss'
// 	},
// 	clean: {
// 		css: 'peoplesmart/MemberWeb/Content/PS/css',
// 		css_base: 'peoplesmart/MemberWeb/Content/Base/css'
// 	}
// };

// // gulp.task('cleanPS_MA', function(cb) {
// // 	rimraf(paths.clean.css, cb);
// // });

// // build PS Member styles
// gulp.task('stylePS_MA_cmpass', function() {
// 	gulp.src(paths.src.style)
// 		.pipe(plumber())
// 		// .pipe(watch([paths.watch.style, paths.watch.style_STORM]).on('change', reload))
// 		.pipe(sourcemaps.init())
// 		.pipe(compass({
// 			config_file: 'peoplesmart/config.rb'
// 			// css: paths.build.css,
// 			// image: paths.build.img,
// 			// sass: paths.src.style,
// 			// sourcemap: true
// 		}))
// 		// .pipe(sass({
// 		// 	sourceMap: true,
// 		// 	errLogToConsole: true
// 		// }))
// 		.pipe(sourcemaps.write('maps'))
// 		.pipe(size({
// 			showFiles: true
// 		}))
// 		.pipe(gulp.dest(paths.build.css));
// });

// // gulp.task('cleanPS_MA_base', function(cb) {
// // 	rimraf(paths.clean.css_base, cb);
// // });
// // // build PS Member Base styles
// // gulp.task('stylePS_MA_Base', function() {
// // 	gulp.src(paths.src.style_base)
// // 		.pipe(plumber())
// // 		.pipe(watch([paths.watch.style_base, paths.watch.style_STORM]).on('change', reload))
// // 		.pipe(sourcemaps.init())
// // 		.pipe(sass({
// // 			sourceMap: true,
// // 			errLogToConsole: true
// // 		}))
// // 		.pipe(sourcemaps.write('maps'))
// // 		.pipe(size({
// // 			showFiles: true
// // 		}))
// // 		.pipe(gulp.dest(paths.build.css_base));
// // });

// // gulp.task('PS_MA', ['serverPS', 'stylePS_MA', 'stylePS_MA_Base']);
// // ====================================================================================================
