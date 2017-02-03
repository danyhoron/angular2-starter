var runSequence = require('run-sequence');

var envConfig = require('../utils/env');
var gulp = require('gulp');
var config = require('../config')();
var bs = require("browser-sync");

function startBrowsersync(config) {
    bsIns = bs.create();
    bsIns.init(config);
    bsIns.reload();
}

if (envConfig.ENV === envConfig.ENVS.DEV) {
    /* Start live server dev mode */
    gulp.task('serve-dev', function () {
        runSequence(
            ['sass', 'tsc-dev'],
            ['html', 'css'],
            ['watch-sass', 'watch-ts', 'watch-html', 'watch-css'], function () {
                startBrowsersync(config.browserSync.dev);
            });
    });
}

if (envConfig.ENV === envConfig.ENVS.PROD) {
    /* Start live server production mode */
    gulp.task('serve-build', ['build'], function () {
        startBrowsersync(config.browserSync.prod);
    });
}
