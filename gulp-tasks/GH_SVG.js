// Good Hire MA tasks ==============================================================================
'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	size = require('gulp-size'),
	svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),

	paths = {
		src: 'SVG/svg-src/vika/*.svg',
		out: 'SVG/svg-out/vika'
	},

// SVG sprite config
	config = {
		shape: {
			dimension: {
				maxWidth: 32,
				maxHeight: 32
			},
			spacing: {
				padding: 0
			},
			id: {
				//generator: 'nav-%s',
				separator: '--',
				pseudo: '~',
				whitespace: '_'
			},
			dest: 'sep-svg'
		},
		svg: {
			// remove add uniq string to class names
			namespaceClassnames: false
		},
		mode: {
			symbol: true,
			css: true
		}
	};

gulp.task('GH_SVG', function() {
	gulp.src(paths.src)
		.pipe(plumber())
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				//$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite(config))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.out));
});
