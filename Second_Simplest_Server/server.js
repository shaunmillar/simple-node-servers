/**
 * Simplest node.js server
 * Exports start
 */

'use strict';

var http = require("http");

function start() {
	function onRequest(request, response) {
		console.log("Request received.");
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.write("Hello from the second simplest node server");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
