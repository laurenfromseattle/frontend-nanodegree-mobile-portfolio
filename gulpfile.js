// Include gulp
var gulp = require('gulp');

// Include plugins
var imageresize = require('gulp-image-resize');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var jsmin = require('gulp-uglify');
var inlinecss = require('gulp-inline-css');

// Minify CSS
gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('minify-js', function() {
	return gulp.src('src/js/*.js')
		.pipe(jsmin())
		.pipe(gulp.dest('dist/js'));
});

// Inline CSS and Minify HTML
gulp.task('minify-html', function() {
	return gulp.src('src/*.html')
		.pipe(inlinecss({
			preserveMediaQueries: true
		}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			removeCommentsFromCDATA: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(gulp.dest('dist'));
});

// Resize images
gulp.task('resize', function() {
	return gulp.src('src/img/*.{jpg,png}')
		.pipe(imageresize({
			width: 100,
			upscale: false
		}))
		.pipe(rename(function (path) {
			path.basename += "-thumb";
		}))
		.pipe(gulp.dest('src/img/thumbs'));
});

// Compress and optimize images
gulp.task('images', function() {
	return gulp.src(['src/img/*.{jpg,png}', 'src/img/thumbs/*.{jpg,png}'])
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [
				{removeViewBox: false},
				{cleanupIDs: false}
			],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch('src/img/*', ['minify-css', 'minify-js', 'minify-html', 'resize', 'images']);
});

// Default task
gulp.task('default', ['minify-css', 'minify-js', 'minify-html', 'resize', 'images', 'watch']);