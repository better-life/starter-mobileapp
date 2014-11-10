var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var plug = require('gulp-load-plugins')();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'templatecache', 'js']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('templatecache', ['sass'], function(cb) {
    gutil.log('Creating an AngularJS $templateCache');

    gulp.src('./www/partials/**/*.html')
      .pipe(plug.angularTemplatecache('templates.js', {
          module: 'myapp',
          standalone: false,
          root: 'partials/'
      }))
      .pipe(gulp.dest('./www/js/'))
      .on('end', cb);
});

gulp.task('js', ['templatecache'], function() {
    gutil.log('Bundling, minifying, and copying the partial\'s JavaScript');

    var source = [
      "./www/partials/**/*.js",
      "./www/js/templates.js",
      "!./www/js/*partials.min.js*"
      ];

    return gulp
        .src(source)
        .pipe(plug.concat('partials.min.js'))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify({mangle: true}))
        .pipe(plug.bytediff.stop())
        .pipe(gulp.dest('./www/js/'));
});