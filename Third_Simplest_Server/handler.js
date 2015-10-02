/**
 * handler.js
 * 
 * Modified from original code at https://gist.github.com/jeffrafter/353700. 
 * 
 */

'use strict';

var Handler = function(method) {
	this.process = function(req, res) {
		var params = null;
		return method.apply(this, [ req, res, params ]);
	};
};

exports.createHandler = function(method) {
	return new Handler(method);
};