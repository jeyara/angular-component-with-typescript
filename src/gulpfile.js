var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    merge2 = require('merge2'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    templateCache = require('gulp-angular-templatecache'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpShell = require('gulp-shell'),
    htmlmin = require('gulp-htmlmin'),
    rimrafplain = require('rimraf'); // rimraf directly

//Configurations
var clientApp = './app/',
    distRoot = './wwwroot/',
    config = {
        templates: {
            htmltemplates: clientApp + 'components/**/*.html',
            templateCache: {
                file: 'templates.js',
                options: {
                    module: 'dashApp',
                    root: 'app/components',
                    standAlone: false
                }
            }
        }
    }


function bundleScripts(src, bundleName) {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat(bundleName + '.js'))
        .pipe(gulp.dest(distRoot + 'js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distRoot + 'js'));
};

function bundleStyles(src, bundleName) {
    return gulp.src(src)
        .pipe(concat(bundleName + '.css'))
        .pipe(gulp.dest(distRoot + 'css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest(distRoot + 'css'));
}

//function bundleNgTemplates(baseSrc, bundlePrefix) {
//    return gulp.src(baseSrc.htmltemplates)
//        .pipe(htmlmin({ collapseWhitespace: true }))
//        .pipe(templateCache(
//            baseSrc.templateCache.file,
//            baseSrc.templateCache.options
//        ))
//        .pipe(gulp.dest(clientApp + bundlePrefix));
//}

gulp.task('default', ['tsc'], function () {
    return gulp.start('cleanwww');
});

gulp.task('tsc', [], gulpShell.task([
    'tsc'
]));


gulp.task('cleanwww', ['removewwwapp','cleanwwwbundle'], function () {
    return gulp.start('postcleanwww');
});

gulp.task('postcleanwww', ['reinitwwwapp'], function () {
    return gulp.start('build');
});

gulp.task('removewwwapp', function (cb) {
    rimrafplain('./wwwroot/app', cb);
});


gulp.task('cleanwwwbundle', function () {
    return gulp.src([
        'wwwroot/css/*.*',
        'wwwroot/js/*.*',
        'wwwroot/fonts/*.*',
    ])
    .pipe(rimraf());
});

gulp.task('reinitwwwapp', [], gulpShell.task([
    'mkdir "./wwwroot/app"'
]));

gulp.task('build', ['lib', 'main.minify'], function () { gulp.src('').pipe(notify('Done building.')); });

gulp.task('lib', function () {

    var css = bundleStyles([
        'app/lib/css/bootstrap.css',
        'app/lib/css/bootstrap-theme.css'
    ], 'bootstrap', 'Bootstrap');

    var script = bundleScripts([
        'app/lib/js/system.js',
        'app/lib/js/config.js'
    ], 'jspm', 'JSPM');

    var bootstrap = bundleScripts([
        'app/lib/js/ui-bootstrap-tpls-1.3.2.js',
    ], 'bootstrap', 'bootstrap');

    var font = gulp.src('app/lib/fonts/*')
    .pipe(gulp.dest(distRoot + 'fonts'));

    return merge2([css, script,bootstrap, font]);
});

gulp.task('main', ['copytemplate'], gulpShell.task([
    'jspm bundle App/main wwwroot/js/bundle.js --inject'
]));

gulp.task('main.minify', ['main'], gulpShell.task([
    'jspm bundle App/main wwwroot/js/bundle.min.js --minify --inject'
]));

gulp.task('copytemplate', [], function () {
    gulp.src('app/**/*.html')
    .pipe(gulp.dest('wwwroot/app'));
});

//gulp.task('templatecache', function () {
//    return bundleNgTemplates(config.templates, 'templates');
//});



gulp.task('devbuild', ['tsc', 'removewwwapp'], function () {
    return gulp.start('copyappfiles');
});

gulp.task('copyappfiles', ['prepfiles', 'mkdirdev'], function () {
    gulp.src('app/**/*.*').pipe(gulp.dest('wwwroot/app'));
});

gulp.task('prepfiles', ['unbundle'], function () {
    return gulp.start('lib');
});

gulp.task('mkdirdev', [], function () {
    'mkdir "./wwwroot/app"'
});

gulp.task('unbundle', [], gulpShell.task([
    'jspm unbundle'
]));



//gulp.task('dev', ['cleanwwwdev'], function () {
//    gulp.src('app/**/*.*')
//    .pipe(gulp.dest('wwwroot/app'));
//    gulp.src('').pipe(notify('Done building.'));
//});

//gulp.task('cleanwwwdev', ['removewwwapp'], function () {
//    return gulp.start('mkdirdev');
//});




