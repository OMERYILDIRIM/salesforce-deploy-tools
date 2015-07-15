module.exports = function(ngModule){
    require("!style!css!less!./funnel-chart.less");
    require('./funnel-chart')(ngModule);
};
