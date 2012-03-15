/**
* winston-amon.js: Transport for logging to an Amon server
*/

var amon = require('amon').Amon;
var util = require('util');
var winston = require('winston');

//
// ### function Amon (options)
// Constructor for the Amon transport object.
//
var Amon = exports.Amon = function (options) {
	options = options || {};
	
	winston.Transport.call(this, options);

	this.name       = 'amon';
	this.host       = options.host       || '127.0.0.1';
	this.port       = options.port       || 2464;
	this.level      = options.level      || 'info';
	this.silent     = options.silent     || false;
	this.amon = amon;

	this.amon.host = this.host;
	this.amon.port = this.port;
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Amon, winston.Transport);

//
// Define a getter so that `winston.transports.Amon` 
// is available and thus backwards compatible.
//
winston.transports.Amon = exports.Amon;

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
Amon.prototype.log = function (level, msg, meta, callback) {
	var self = this;

	if (this.silent) {
		return callback(null, true);
	}

	this.amon.log({
		timestamp: new Date(),
		message: msg,
		meta: meta
	}, level);

	callback(null, true);
};

//
// ### function logException (msg, meta, callback, err) 
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// #### @err {Object} Original error object
// Passes the error through to the amon error handler
//
Amon.prototype.logException = function (msg, meta, callback, err) {
	var self = this;

	function onLogged () {
		self.removeListener('error', onError);
		callback();
	}

	function onError () {
		self.removeListener('logged', onLogged);
		callback();
	}

	this.once('logged', onLogged);
	this.once('error', onError);

	amon.handle(err);
};
