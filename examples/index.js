'use strict';

var env = require( './../lib' ),
	map = require( './env.json' );

process.env[ 'DEFAULT' ] = process.env[ 'DEFAULT' ] || 'beep';
process.env[ 'STR' ] = process.env[ 'STR' ] || 'boop';
process.env[ 'NUM' ] = process.env[ 'NUM' ]  || '1234.5';
process.env[ 'BOOL' ] = process.env[ 'BOOL' ] || 'true';
process.env[ 'ARR' ] = process.env[ 'ARR' ] || '[1,2,3,4]';
process.env[ 'NESTED' ] = process.env[ 'NESTED' ] || '{"hello":"world"}';
process.env[ 'DATE' ] = process.env[ 'DATE' ] || '2015-10-18T07:00:01.000Z';
process.env[ 'REGEX'] = process.env[ 'REGEX' ] || '/\\w+/';
process.env[ 'INT' ] = process.env[ 'INT' ] || '1234';

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
		},
		'date': <date>,
		're': /\w+/,
		'int': 1234
	}
*/
