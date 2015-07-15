var jsForceConfig = {
  credentials: {
    //salesforce username
    username: '',
    //salesforce password
    password: '',
    //salesforce security token
    token: '''
  },
  paths: {
    //directory JS build tools target
    buildDir: './dist',
    //used by gulp to set base directory option
    //TODO: not supported yet
    baseDir: '.',
    //directory to store files for server (probably in )
    bundleDir: './staticResources',
    //directory of project (used to push project)
    projectDir: '../../project'
  },
  //name of bundle on salesforce
  bundleName: 'bundle',
  //filetypes to upload
  fileTypes: 'all' //grab all filetypes in buildSrc
  /* you may whitelist specific filetypes if desired
  [ 'css', 'js', 'png' ]
  */
};

module.exports = jsForceConfig;
