'use strict';

// MODULES //

var validate = require( './validate.boolean.js' );


// PARSE //

/**
* FUNCTION: parseBoolean( str[, options] )
*	Parses a string as a boolean.
*
* @param {String} str - string to parse
* @param {Object} [options] - function options
* @param {Boolean} [options.strict=false] - indicates whether to accept only `true` and `false` as acceptable boolean strings
* @returns {Boolean|Error} parsed value or error object
*/
function parseBoolean( str, options ) {
	var opts = {};
	var err;
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			return err;
		}
	}
	if ( opts.strict ) {
		if ( str === 'true' ) {
			return true;
		}
		if ( str === 'false' ) {
			return false;
		}
	} else {
		str = str.toLowerCase();
		if (
			str === 'true' ||
			str === 't'
		) {
			return true;
		}
		if (
			str === 'false' ||
			str === 'f'
		) {
			return false;
		}
	}
	return new TypeError( 'invalid value. Unable to parse string as a boolean. Value: `' + str + '`.' );
} // end FUNCTION parseBoolean()


// EXPORTS //

module.exports = parseBoolean;
