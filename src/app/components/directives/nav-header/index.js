module.exports = function(ngModule){
    require("!style!css!less!./nav-header.less");
    require('./nav-header')(ngModule);
};
