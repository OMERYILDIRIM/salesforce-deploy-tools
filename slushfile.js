var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inquirer = require('inquirer');

var rename = require('gulp-rename');
var spawn = require('child_process').spawn;
var path = require('path');
var _ = require('underscore.string');
var sfSetup = require('sf-placeholder');
var data = require('gulp-data');
var files = [];

gulp.task('default', ['newProject'], function (done) {
  inquirer.prompt([
  ],
  function (answers) {
    if (!answers.moveon) {
      return done();
    }
    gulp.src(__dirname + '/templates/app/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
      .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
      .on('end', function () {
        done();                                // Finished!
      })
      .resume();
  });
});

gulp.task('default', function (done) {
  inquirer.prompt([],
  function (answers) {
    /*// set the page name to none if it is a non salesforce project
    if(typeof answers.pageName === 'undefined' && mPageName === '' ){
        answers.pageName = 'none';
    }
    mPageName = answers.pageName;*/

    // build project directory
    answers.slug = _.slugify(answers.name);
    answers.camel = _.camelize(answers.slug);
    path.resolve(process.cwd(), answers.slug);
    files.push(__dirname + '/templates/');
    files.push(__dirname + '/templates/webpack.config.js');
    files.push(__dirname + '/templates/webpack.salesforce.js');
    files.push(__dirname + '/templates/webpack.salesforce.deploy.js');
    files.push(__dirname + '/templates/package.json');
    files.push(__dirname + '/templates/karma.conf.js');
    files.push(__dirname + '/templates/app/index.html');
    files.push(__dirname + '/templates/app/index.js');
    files.push(__dirname + '/templates/app/states/main/*');
    files.push(__dirname + '/templates/app/components/form/*');
    files.push(__dirname + '/templates/app/components/navBar/*');
    files.push(__dirname + '/templates/app/components/simpleTest/*');

    answers.pageName = answers.name;

    // create visualforce page and placeholder
    if(answers.salesforce !== false){
      console.log(answers.username);
      console.log(answers.password);
      console.log(answers.token);
      console.log(answers.pageName);
    }

    var jsForceConfig = {}, sfSetup = {};//turns off error checking
    sfSetup.defineUserName((typeof jsForceConfig === 'undefined') ?
                           '' + answers.username + '' :
                           '' + jsForceConfig.username + '' );
    sfSetup.definePassword((typeof jsForceConfig === 'undefined') ?
                           '' + answers.password + '' :
                           '' + jsForceConfig.password + '');
    sfSetup.defineToken((typeof jsForceConfig === 'undefined') ?
                        '' + answers.token + '' :
                        '' + jsForceConfig.token + '');
    if(answers.salesforce !== false){
      sfSetup.setupPageAndResource('' + answers.pageName + '');
    }


    return gulp.src(files,{base:__dirname + '/templates' })
    .pipe(data(function (answers) {
      return { pageName: answers.pageName };
    }))
    .pipe(template(answers))
    .pipe(rename(function (file) { if (file.basename[0] === '_') { file.basename = '.' + file.basename.slice(1); }}))
    .pipe(conflict(path.join(process.cwd(), answers.name)))
    .pipe(gulp.dest(path.join(process.cwd(), answers.name)))
    .pipe(install())
    .on('finish', function () {
        done();
    });
  });
});
