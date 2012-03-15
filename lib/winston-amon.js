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

	this.name       = 'amon';
	this.host       = options.host       || '127.0.0.1';
	this.port       = options.port       || 2464;
	this.level      = options.level      || 'info';
	this.silent     = options.silent     || false;

	amon.host = this.host;
	amon.port = this.port;
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Amon, winston.Transport);

//
// Define a getter so that `winston.transports.Amon` 
// is available and thus backwards compatible.
//
winston.transports.Amon = Amon;

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

	amon.log({
		timestamp: new Date(),
		message: msg,
		meta: meta
	}, level);

	callback(null, true);
};