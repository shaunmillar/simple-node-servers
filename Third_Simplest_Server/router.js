/**
 * router.js
 * 
 * Modified from original code at https://gist.github.com/jeffrafter/353700. 
 * 
 */

'use strict';

var handlerFactory = require('./handler');
var fs = require('fs');
var parser = require('url');
var handlers = {};

var public_folder = '/public';

// required for mime type selection. 
String.prototype.endsWith = function (s) {
	  return this.length >= s.length && this.substr(this.length - s.length) === s;
};

exports.clear = function() {
	handlers = {};
};

exports.register = function(url, method) {
	handlers[url] = handlerFactory.createHandler(method);
};

exports.route = function(req) {
	var url = parser.parse(req.url, true);
	var handler = handlers[url.pathname];
	if (!handler) {
		handler = this.missing(req);
	}
	return handler;
};

exports.missing = function(req) {
	// Try to read the file locally, this is a security hole..
	// /../../etc/passwd
	var url = parser.parse(req.url, true);
	var path = __dirname + public_folder + url.pathname;
	try {
		var data = fs.readFileSync(path);
		return handlerFactory.createHandler(function(req, res) {
			// figure out the mime type to return in the header. 
			if (url.pathname.endsWith('.js')) {
				res.setHeader("Content-Type", 'text/javascript');
			}
			if (url.pathname.endsWith('.html')) {
				res.setHeader("Content-Type", 'text/html');
			}
			if (url.pathname.endsWith('.css')) {
				res.setHeader("Content-Type", 'text/css');
			}
			res.writeHead(200);
			res.write(data);
			res.end();
		});
	} catch (e) {
		return handlerFactory.createHandler(function(req, res) {
			res.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			res.write("No route registered for " + url.pathname);
			res.end();
		});
	}
};