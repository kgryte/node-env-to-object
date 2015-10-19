'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isStringArray = require( 'validate.io-string-array' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String[]} [options.oneof] - set of allowed values
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'oneof' ) ) {
		opts.oneof = options.oneof;
		if ( !isStringArray( opts.oneof ) ) {
			return new TypeError( 'invalid option. `oneof` option must be a string array. Option: `' + opts.oneof + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
