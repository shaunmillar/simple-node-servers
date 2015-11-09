'use strict';

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var util = require('util');
var server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body.toString());
        });
        req.on('end', function () {
            // request ended -> do something with the data
      		res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      
      		// parse the received body data
      		var decodedBody = querystring.parse(body);

      		// output the decoded data to the HTTP response          
      		res.write(util.inspect(decodedBody));
      		res.end();
        });
    }
	else {
        console.log("GET");
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
});

var port = 3000;
var host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
