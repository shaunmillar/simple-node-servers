/**
 * Simple node.js server with router. 
 * 
 * Modified from original code at https://gist.github.com/jeffrafter/353700. 
 * 
 * Set port and items to be served up in the public folder. 
 * 
 * If new mime types must be supported, update router.js
 * 
 */

'use strict';

var http = require('http');
var router = require('./router');
var handler = require('./handler');

var port = 8888;

// preset routes. Could be useful for RESTful service.
router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
});

// if not serviced above, pass to the router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// start up the server
server.listen(port);
console.log('Basic server running on port ' + port + '.');