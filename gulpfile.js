const gulp = require('gulp'),
	sass = require('gulp-sass'),
	ejs = require('gulp-ejs'),
	prefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync');

const path = {
	build: {
		html: 'dist',
		js: 'dist/js',
		css: 'dist/css',
		img: 'dist/img',
		fonts: 'dist/fonts'
	},
	src: {
		html: 'src/**/*.html',
		js: 'src/**/*.js',
		jq: './jquery.js',
		style: 'src/**/*.scss',
		img: 'src/img/**/*',
		fonts: 'src/fonts/**/*'
	},
	clean: './dist'
};

const htmlBuild = () => (
	gulp.src(path.src.html)
		.pipe(ejs({}, {}, { ext: '' }))
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream())
);

const scssBuild = () => (
	gulp.src(path.src.style)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(clean())
		.pipe(prefixer({
			Browserslist: ['> 0.01%','last 100 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream())
);

const jsBuild = () => (
	gulp.src(path.src.js)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream())
);

const imgBuild = () => (
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
);

const fontsBuild = () => (
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browserSync.stream())
);

const cleanBuild = () => (
	gulp.src(path.clean, {allowEmpty: true})
		.pipe(clean())
);

const watcher = () => {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	gulp.watch(path.src.html, htmlBuild).on('change', browserSync.reload);
	gulp.watch(path.src.style, scssBuild).on('change', browserSync.reload);
	gulp.watch(path.src.js, jsBuild).on('change', browserSync.reload);
	gulp.watch(path.src.img, imgBuild).on('change', browserSync.reload);
	gulp.watch(path.src.fonts, fontsBuild).on('change', browserSync.reload);
};

/*************** --- T A S K S --- ***************/
gulp.task('html', htmlBuild);
gulp.task('styles', scssBuild);
gulp.task('js', jsBuild);
gulp.task('img', imgBuild);
gulp.task('fonts', fontsBuild);
gulp.task('watch', watcher);
gulp.task('clean', cleanBuild);

gulp.task('default', gulp.series(
	cleanBuild,
	htmlBuild,
	scssBuild,
	jsBuild,
	gulp.parallel(fontsBuild,imgBuild),
	watcher
));