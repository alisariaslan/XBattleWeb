var date = require('date-and-time');

exports.getdate = function () {
    return Date();
};

exports.getdatelog = function () {
    var now  =  new Date();
    var value = date.format(now,'hh:MM:ss');
    return value + " -> ";
};
