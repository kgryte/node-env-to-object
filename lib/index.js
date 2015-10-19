'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' );
var isObject = require( 'validate.io-object' );
var merge = require( 'utils-merge2' )();
var validate = require( './validate.js' );
var error = require( './error.js' );


// PARSERS //

var PARSERS = {
	'string': require( './string.js' ),
	'number': require( './number.js' ),
	'integer': require( './integer.js' ),
	'boolean': require( './boolean.js' ),
	'object': require( './object.js' ),
	'date': require( './date.js' ),
	'regexp': require( './regexp.js' )
};


// ENVIRONMENT VARIABLES //

/**
* FUNCTION: env( map[, options] )
*	Maps environment variables to a configuration object.
*
* @param {Object} map - environment variable mapping
* @param {Object} [options] - function options
* @param {Object} [options.parsers] - environment variable parsers
* @returns {Object} configuration object
*/
function env( map, options ) {
	var parse;
	var opts;
	var keys;
	var err;
	var key;
	var out;
	var len;
	var val;
	var p;
	var o;
	var i;
	if ( !isObject( map ) ) {
		throw new TypeError( 'invalid input argument. Map argument must be an object. Value: `' + map + '`.' );
	}
	opts = {
		'parsers': {}
	};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	p = merge( {}, PARSERS, opts.parsers );
	keys = Object.keys( map );
	len = keys.length;
	out = {};
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		o = map[ key ];
		val = process.env[ key ];
		if ( val === void 0 ) {
			continue;
		}
		if ( o.type === void 0 ) {
			parse = p[ 'string' ];
			val = parse( val, o );
		} else {
			parse = p[ o.type ];
			if ( parse === void 0 ) {
				throw new Error( 'invalid type. Unsupported/unrecognized environment variable value type. Type: `' + o.type + '`.' );
			}
			val = parse( val, o );
		}
		if ( val instanceof Error ) {
			throw error( val, key );
		}
		deepSet( out, o.keypath, val, {
			'create': true,
			'sep': '.'
		});
	}
	return out;
} // end FUNCTION env()


// EXPORTS //

module.exports = env;
