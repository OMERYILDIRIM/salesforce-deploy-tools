'use strict';

var gulp = require('gulp');
//var gutil = require('gulp-util');
var fs = require("fs-extra");
var jsforce = require('jsforce');
var jszip = require("jszip");
var zip = new jszip();

var jsforceConfig = require('./jsforce.config');

//directories
var root = './dist';
//var outputDir = './dist';
//var fileName = 'dist.zip';

//credentials
var username = jsforceConfig.credentials.username;
var pwdAndToken = jsforceConfig.credentials.password + jsforceConfig.credentials.token;

gulp.task('sometest', ['build'], function () {
  console.log('beginning sometest');

  //function to get all files in directory
  var getFileList = function(_path) {
  	var fileslist = [];
  	var files = fs.readdirSync(_path);

  	files.forEach(function(file) {
  		var pathname = _path + "/" + file;
  		var stat = fs.lstatSync(pathname);

  		if (!stat.isDirectory()) {
  			fileslist.push(pathname.replace(root + "/", ""));
  		} else {
  			fileslist = fileslist.concat(getFileList(pathname));
  		}
  	});
  	return fileslist;
  };

  //generate files
	var files = getFileList(root);

  //add files to zip object
	if (files !== null && files !== undefined && files.length !== 0) {
		for (var i = 0; i < files.length; i++) {
			var content = fs.readFileSync(root + "/" + files[i]);
			zip.file(files[i], content);
		}
	}

  //generate zip file
  //zipApp.generate({base64: true, compression: 'DEFLATE'});
	var zipFile = zip.generate({
    base64: true,
		//type: "nodebuffer",
    compression: 'DEFLATE'
	});

  console.log('deployToSF is firing connection');
  //connnect to SalesForce using jsforce
  var conn = new jsforce.Connection({loginUrl : 'https://login.salesforce.com'});

  console.log('deployToSF is logging in');

  conn.login(username, pwdAndToken)
    .then(function () {
      var metadata = [{
        fullName: 'resource',
        description: 'spa data files',
        content: zipFile,//fs.readFileSync(outputDir + "/" + fileName),
        contentType: 'application/zip',
        cacheControl: 'Private'
      }];

      conn.metadata.update('StaticResource', metadata)
        .then(function(results) {
          console.log('results are: ', results);
          console.log('success ? : ' + results.success);
          console.log('created ? : ' + results.created);
          console.log('fullName : ' + results.fullName);
        }, function (err) {
          console.error('error is: ', err);
        });
    })
    .then(function (res) {
      console.log('deployToSF is firing response check.', res);
      if (res.details && res.details.componentFailures) {
        console.error(res.details.componentFailures);
      }
    }, function (err) {
      console.error(err);
    });
});

gulp.task('sf-build:spa', [/*'clean', 'build'*/], function () {
/*
  //write zip file
	fs.writeFile(fileName, zipFile, function() {
		fs.move(fileName, outputDir + "/" + fileName,
          { clobber: true },
          function(error) {
            console.log(error);
    			});//END move
	});//END writeFile
*/
});
