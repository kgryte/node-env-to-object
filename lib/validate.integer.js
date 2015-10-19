'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isInteger = require( 'validate.io-integer' );
var isIntegerArray = require( 'validate.io-integer-array' );
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
* @param {Number} [options.radix] - radix
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'enum' ) ) {
		opts.enum = options.enum;
		if ( !isIntegerArray( opts.enum ) ) {
			return new TypeError( 'invalid option. `enum` option must be an integer array. Option: `' + opts.enum + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'radix' ) ) {
		opts.radix = options.radix;
		if ( !isInteger( opts.radix ) ) {
			return new TypeError( 'invalid option. Radix must be an integer. Option: `' + opts.radix + '`.' );
		}
		if ( opts.radix < 2 || opts.radix > 36 ) {
			return new RangeError( 'invalid option. Radix must be an integer on the interval [2,36]. Option: `' + opts.radix + '`.' );
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
