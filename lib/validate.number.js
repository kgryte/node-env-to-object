'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isNumberArray = require( 'validate.io-number-array' );
var isNumber = require( 'validate.io-number-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {Number[]} [options.enum] - set of allowed values
* @param {Number} [options.emin] - exclusive minimum
* @param {Number} [options.emax] - exclusive maximum
* @param {Number} [options.min] - minimum value
* @param {Number} [options.max] - maximum value
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'enum' ) ) {
		opts.enum = options.enum;
		if ( !isNumberArray( opts.enum ) ) {
			return new TypeError( 'invalid option. `enum` option must be a number array. Option: `' + opts.enum + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'emin' ) ) {
		opts.emin = options.emin;
		if ( !isNumber( opts.emin ) ) {
			return new TypeError( 'invalid option. Exclusive minimum option must be a number primitive. Option: `' + opts.emin + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'emax' ) ) {
		opts.emax = options.emax;
		if ( !isNumber( opts.emax ) ) {
			return new TypeError( 'invalid option. Exclusive maximum option must be a number primitive. Option: `' + opts.emax + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'min' ) ) {
		opts.min = options.min;
		if ( !isNumber( opts.min ) ) {
			return new TypeError( 'invalid option. Minimum value option must be a number primitive. Option: `' + opts.min + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'max' ) ) {
		opts.max = options.max;
		if ( !isNumber( opts.max ) ) {
			return new TypeError( 'invalid option. Maximum value option must be a number primitive. Option: `' + opts.max + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
