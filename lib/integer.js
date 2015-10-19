'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' );
var contains = require( 'validate.io-contains' );
var validate = require( './validate.integer.js' );


// PARSE INTEGER //

/**
* FUNCTION: parseInteger( str[, options] )
*	Parses a string as an integer.
*
* @param {String} str - string to parse
* @param {Object} [options] - function options
* @param {Number[]} [options.enum] - set of allowed values
* @param {Number} [options.emin] - exclusive minimum
* @param {Number} [options.emax] - exclusive maximum
* @param {Number} [options.min] - minimum value
* @param {Number} [options.max] - maximum value
* @param {Number} [options.radix=10] - radix
* @returns {Number|Error} integer or error object
*/
function parseInteger( str, options ) {
	var opts = {};
	var err;
	var v;

	opts.radix = 10;
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			return err;
		}
	}
	v = parseInt( str, opts.radix );
	if ( isnan( v ) ) {
		return new TypeError( 'invalid value. Unable to parse string as an integer. Value: `' + str + '`.' );
	}
	if ( arguments.length === 1 ) {
		return v;
	}
	if ( opts.enum ) {
		if ( !contains( opts.enum, v ) ) {
			return new Error( 'invalid value. Value must be one of the following: `[' + ( opts.enum.join( ',' ) ) + ']`. Value: `' + v + '`.' );
		}
		return v;
	}
	if (
		opts.emin !== void 0 &&
		v <= opts.emin
	) {
		return new RangeError( 'invalid value. Value must be greater than ' + opts.emin + '. Value: `' + v + '`.' );
	}
	else if (
		opts.min !== void 0 &&
		v < opts.min
	) {
		return new RangeError( 'invalid value. Value cannot be less than ' + opts.min + '. Value: `' + v + '`.' );
	}
	if (
		opts.emax !== void 0 &&
		v >= opts.emax
	) {
		return new RangeError( 'invalid value. Value must be less than ' + opts.emax + '. Value: `' + v + '`.' );
	}
	else if (
		opts.max !== void 0 &&
		v > opts.max
	) {
		return new RangeError( 'invalid value. Value cannot be greater than ' + opts.max + '. Value: `' + v + '`.' );
	}
	return v;
} // end FUNCTION parseInteger()


// EXPORTS //

module.exports = parseInteger;
