var compression = require('compression');

var compress = compression({filter: shouldCompress});

function intercept(req, res){
    compress(req, res, function () {});
}

function shouldCompress (req, res) {
    return compression.filter(req, res)
}

module.exports = intercept;