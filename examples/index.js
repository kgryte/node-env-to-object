'use strict';

var env = require( './../lib' ),
	map = require( './env.json' );

process.env[ 'DEFAULT' ] = process.env[ 'DEFAULT' ] || 'beep';
process.env[ 'STR' ] = process.env[ 'STR' ] || 'boop';
process.env[ 'NUM' ] = process.env[ 'NUM' ]  || '1234.5';
process.env[ 'BOOL' ] = process.env[ 'BOOL' ] || 'true';
process.env[ 'ARR' ] = process.env[ 'ARR' ] || '[1,2,3,4]';
process.env[ 'NESTED' ] = process.env[ 'NESTED' ] || '{"hello":"world"}';

var out = env( map );
console.dir( out );
/*
	{
		'default': 'beep',
		'str': 'boop',
		'num': 1234.5,
		'bool': true,
		'arr': [1,2,3,4],
		'a': {
			'b': {
				'c': {
					'd': {
						'hello': 'world'
					}
				}
			}
		}
	}
*/
