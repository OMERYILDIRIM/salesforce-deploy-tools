'use strict';

var gulp = require('gulp');
/*
 * type: 'input',
 *       'confirm',
 *       'list', has paginate: true option
 *       'rawlist',
 *       'password',
 *       'expand' {key: 'foo', name: name, value: 'someval'}
 *       'checkbox' {name: name, checked: true}
 * name: name for answer stored in answer hash
 * message: the question to ask
 * default: value if nothing entered (if function, then result of func is answer)
 * choices: array or fn returning an array
 * validate: function that checks input
 * filter: function to filter the answer before it is stored in the hash
 * when: fn or bool that determines if question should be asked
 * new inquirer.Separator() to store separator
 */

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    default: gulp.args.join(' ')
  },
  {
    type: 'confirm',
    name: 'isSFApp',
    message: 'Is this a Salesforce application?',
    default: true
  },
  {
    type: 'input',
    name: 'sfUserName',
    message: 'What is your Salesforce username?',
    default: '',
    when: function (ans) { return ans.isSFApp; }
  },
  {
    type: 'password',
    name: 'sfPassword',
    message: 'What is your Salesforce password (no token)?',
    default: '',
    when: function (ans) { return ans.isSFApp; }
  },
  {
    type: 'password',
    name: 'sfToken',
    message: 'What is your Salesforce token?',
    default: '',
    when: function (ans) { return ans.isSFApp; }
  },
  {
    type: 'input',
    name: 'sfBundleName',
    message: 'What do you want to call your main app bundle on salesforce?',
    default: 'spabundle',
    when: function (ans) { return ans.isSFApp; }
  },
  {
    type: 'confirm',
    name: 'isSeparateCSS',
    message: 'Do you want your CSS in a separate bundle?',
    default: false,
    when: false
  },
  {
    type: 'input',
    name: 'sfCSSBundleName',
    message: 'What do you want to call your CSS bundle on salesforce?',
    default: 'spacssbundle',
    when: false // function (ans) { return ans.isSeparateCSS; }
  },
  {
    type: 'confirm',
    name: 'isContinuing',
    message: 'You may change your SF preferences in your jsforce.config.js file inside\n' +
             'the gulp/jsforce folder. Adjust your other options in package.json\n' +
             'Are you ready to start installing?',
    default: true
  }
];
