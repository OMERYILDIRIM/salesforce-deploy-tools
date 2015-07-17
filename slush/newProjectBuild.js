'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inquirer = require('inquirer');

var newProjectPrompts = require('./slush/newProjectPrompts');

gulp.task('newProject', function (done) {
  inquirer.prompt(newProjectPrompts, function (ans) {
    if (!ans.isContinuing) { return done(); }

    gulp.src(__dirname + '/templates/app/**')  // Note use of __dirname to be relative to generator
      .pipe(template(ans))                 // Lodash template support
      .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
      .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
      .on('end', function () {
        done();                                // Finished!
      })
      .resume();
  });
});
