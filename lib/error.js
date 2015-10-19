'use strict';

/**
* FUNCTION: error( err, env )
*	Creates an error tailored to the module.
*
* @param {Error|TypeError|RangeError} err - error object
* @param {String} env - environment variable name
* @returns {Error|TypeError|RangeError} error object
*/
function error( err, env ) {
	var msg = err.message;
	var out;

	msg += ' Environment variable: `' + env + '`.';
	if ( err instanceof TypeError ) {

		out = new TypeError( msg );
	}
	else if ( err instanceof RangeError ) {
		out = new RangeError( msg );
	}
	else {
		out = new Error( msg );
	}
	return out;
} // end FUNCTION error()


// EXPORTS //

module.exports = error;
