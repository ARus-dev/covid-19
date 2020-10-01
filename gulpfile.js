const {src, dest, parallel, series, watch} = require('gulp')

const browserSync = require('browser-sync').create()

const pug = require('gulp-pug')
const htmlbeautify = require('gulp-html-beautify')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')

function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts)
	watch(['src/**/*.scss', '!src/**/_*.scss'], styles)
	watch(['src/**/*.pug', '!src/views/**/*.pug'], html)
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist/'
		},
		notify: false,
		online: true
	})
}

function html() {
	return src('src/index.pug')
	.pipe(pug())
	.pipe(htmlbeautify())
	.pipe(dest('dist/'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'node_modules/svg4everybody/dist/svg4everybody.min.js',
		'src/js/main.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'src/scss/main.scss'
	])
	.pipe(sass())
	.pipe(concat('styles.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
	.pipe(dest('dist/css/'))
	.pipe(browserSync.stream())
}

exports.browsersync = browsersync
exports.html = html
exports.scripts = scripts
exports.styles = styles

exports.default = parallel(html, styles, scripts, browsersync, startwatch)