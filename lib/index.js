'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ),
	parseJSON = require( 'utils-json-parse' ),
	isnan = require( 'validate.io-nan' ),
	isObject = require( 'validate.io-object' );


// ENVIRONMENT VARIABLES //

/**
* FUNCTION: env( map )
*	Maps environment variables to a configuration object.
*
* @param {Object} map - environment variable mapping
* @returns {Object} configuration object
*/
function env( map ) {
	var keys,
		out,
		len,
		val,
		o,
		i;

	if ( !isObject( map ) ) {
		throw new TypeError( 'invalid input argument. Map argument must be an object. Value: `' + map + '`.' );
	}
	keys = Object.keys( map );
	len = keys.length;
	out = {};
	for ( i = 0; i < len; i++ ) {
		o = map[ keys[ i ] ];
		val = process.env[ keys[ i ] ];
		if ( val === void 0 ) {
			continue;
		}
		if ( o.type === 'number' ) {
			val = parseFloat( val );
			if ( isnan( val ) ) {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a number. Value: `' + val + '`.' );
			}
		}
		else if ( o.type === 'boolean' ) {
			if (
				val === 'true' ||
				val === 'TRUE' ||
				val === 'True' ||
				val === 'T' ||
				val === 't'
			) {
				val = true;
			}
			else if (
				val === 'false' ||
				val === 'FALSE' ||
				val === 'False' ||
				val === 'F' ||
				val === 'f'
			) {
				val = false;
			}
			else {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a boolean. Value: `' + val + '`.' );
			}
		}
		else if ( o.type === 'object' ) {
			val = parseJSON( val );
			if ( val instanceof Error ) {
				throw new TypeError( 'invalid value. ' + keys[ i ] + ' environment variable must be a valid JSON object. Value: `' + val + '`. Error: `' + val.message + '`.' );
			}
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
