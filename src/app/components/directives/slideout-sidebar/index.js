module.exports = function(ngModule){
    require("!style!css!less!./slideout-sidebar.less");
    require('./slideout-sidebar')(ngModule);
};
