/**
 * Simplest node.js server
 * 
 */

'use strict';

var http = require("http");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello from the simple node server");
	response.end();
}).listen(8888); 
