var http = require('http');

var handleRequest = function(request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.end('Welcome to Node Essential Training\n');
};

var server = http.createServer(handleRequest);

server.listen(3000, 'localhost');
