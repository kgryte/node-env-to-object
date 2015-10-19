'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {Boolean} [options.strict=false] - indicates whether to only accept `true` and `false` as acceptable boolean strings
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'strict' ) ) {
		opts.strict = options.strict;
		if ( !isBoolean( opts.strict ) ) {
			return new TypeError( 'invalid option. Strict option must be a boolean primitive. Option: `' + opts.strict + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
