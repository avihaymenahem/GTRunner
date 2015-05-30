var gulp = require('gulp'),
    gutil = require('gutil'),
    shell = require('gulp-shell'),
    nwBuilder = require('node-webkit-builder');

var Globals = {
    Platform : "win64",
    nwVersion : "0.12.2"
};

gulp.task('open', function () {
    gulp.src('./cache/' + Globals.nwVersion + '/' + Globals.Platform + '/nw.exe', {read: true})
        .pipe(shell(['<%= file.path %> ./']));
});

gulp.task('build', function () {
    var nw = new nwBuilder({
        version : Globals.nwVersion,
        files : ["./**", "!./node_modules/gulp/**", "!./node_modules/gutil/**", "!./node_modules/node-webkit-builder/**", "!./node_modules/gulp-shell/**", "!./build/**", "!./cache/**"],
        platforms : (!Globals.Platform || Globals.Platform == 'all' ? ['osx32', 'osx64', 'linux32', 'linux64', 'win32', 'win64'] : [Globals.Platform])
    }).on('log', function (msg) { gutil.log('node-webkit-builder', msg) });
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});