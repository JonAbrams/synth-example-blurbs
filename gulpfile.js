var gulp = require('gulp');

// register default synth tasks with gulp
var startServer = require('synth/gulp')(gulp).startServer;

gulp.task('server', ['synth-server'], function () {
  startServer();
});
