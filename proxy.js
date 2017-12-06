var http = require('http'),
    httpProxy = require('http-proxy'),
    compressInterceptor = require('./interceptor/compress.js'),
    interceptorList = [compressInterceptor];
 
var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
    executeInterceptor(req, res);
    proxy.web(req, res, { target: 'http://' + req.headers.host });
});

function executeInterceptor(req, res){
    interceptorList.forEach(interceptor => {
        interceptor(req, res);
    });
}

console.log("Reversed proxy started");
console.log("Listening on 127.0.0.1:9000");
server.listen(9000);