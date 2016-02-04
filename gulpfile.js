var gulp          = require("gulp"),
	es            = require("event-stream"),
	concat        = require("gulp-concat"),
	connect       = require("gulp-connect"),
	inject        = require("gulp-inject"),
	rename        = require("gulp-rename"),
	templateCache = require("gulp-angular-templatecache"),
	uglify        = require("gulp-uglify"),
	cache         = require("gulp-cached"),
	runSequence   = require("run-sequence"),
	rimraf        = require("rimraf"),
	open          = require("open"),
	bowerFiles    = require('main-bower-files'),
	filelog       = require('gulp-filelog');

var paths = {
	base:        "src/",
	index:       "src/index.html",
	images:      "src/img/**/*",
	styles:      "src/css/**/*.scss",
	base_styles: "src/css/main.scss",
	scripts:     "src/js/**/*.js",
	partials:    "src/templates/**/*.html"
}

gulp.task("clean", function(cb){
	rimraf.sync("./www");
	cb(null);
});

gulp.task("dependencies", function() {
	gulp.src(bowerFiles({
		filter: /\.js$/i,
		paths: {
			bowerDirectory: './bower_components'
		}
	}))
	.pipe(concat('dependencies.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./bower_components"))
});

gulp.task('scripts', function() {
	return es.concat(
		gulp.src('./bower_components/dependencies.js')
			.pipe(cache('dependencies'))
			.pipe(gulp.dest("./www/scripts")),
		gulp.src(paths.scripts)
			.pipe(cache('scripts'))
			.pipe(gulp.dest("./www/scripts"))
	);
});

gulp.task('index', function() {
	var scripts = [
		'./www/scripts/dependencies.js',
		'./www/scripts/**/*.js'
	]

  gulp.src(paths.index)
	.pipe(inject(es.merge(gulp.src(scripts, {
		read: false
	})), {
		ignorePath: "/www",
		addRootSlash: false
	}))
	.pipe(gulp.dest("./www"));
});

gulp.task('compile', function(cb) {
	runSequence(
		[
			'scripts', 
			// 'styles', 
			// 'images', 
			// 'fonts'
		], 
		// 'partials', 
		'index', 
		// 'reload', 
		cb
	);
});

gulp.task('build', function(cb) {
  runSequence(
	'clean',  
	'compile', 
	cb);
});