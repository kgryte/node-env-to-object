'use strict';

// MODULES //

var contains = require( 'validate.io-contains' );
var validate = require( './validate.string.js' );


// PARSE STRING //

/**
* FUNCTION: parseString( str[, options] )
*	Parses a string.
*
* @param {String} str - string to parse
* @param {Object} [options] - function options
* @param {String[]} [options.enum] - set of allowed values
* @returns {String|Error} string or error object
*/
function parseString( str, options ) {
	var opts = {};
	var err;
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			return err;
		}
	}
	if ( opts.enum && !contains( opts.enum, str ) ) {
		return new Error( 'invalid value. Value must be one of the following: `[' + ( opts.enum.join( ',' ) ) + ']`. Value: `' + str + '`.' );
	}
	return str;
} // end FUNCTION parseString()


// EXPORTS //

module.exports = parseString;
