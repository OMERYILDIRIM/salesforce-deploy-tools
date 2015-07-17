'use strict';

var gulp = require('gulp');

module.exports = {
  directive: [
    {
      type: 'input',
      name: 'directiveName',
      message: 'What is the name of your directive?',
      default: gulp.args.join(' ')
    },
    {
      type: 'input',
      name: 'directiveDir',
      message: 'Where will this directive be created?',
      default: __dirname
    }
  ],
  service: [
    {
      type: 'input',
      name: 'serviceName',
      message: 'What is the name of your service?',
      default: gulp.args.join(' ')
    },
    {
      type: 'input',
      name: 'serviceDir',
      message: 'Where will this service be created?',
      default: __dirname
    }
  ],
  controller: [
    {
      type: 'input',
      name: 'controllerName',
      message: 'What is the name of your controller?',
      default: gulp.args.join(' ')
    },
    {
      type: 'input',
      name: 'controllerDir',
      message: 'Where will this controller be created?',
      default: __dirname
    }
  ],
  factory: [
    {
      type: 'confirm',
      name: 'isContinuing',
      message: 'ES2015 style prefers services. Continue anyway?',
      default: true,
    },
    {
      type: 'input',
      name: 'factoryName',
      message: 'What is the name of your factory?',
      default: gulp.args.join(' '),
      when: function (ans) { return ans.isContinuing; }
    },
    {
      type: 'input',
      name: 'factoryDir',
      message: 'Where will this factory be created?',
      default: __dirname,
      when: function (ans) { return ans.isContinuing; }
    }
  ],
};
