/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	map = require( './fixtures/env.json' ),
	env = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'env-to-object', function tests() {

	it( 'should export a function', function test() {
		expect( env ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a map object', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){},
			[]
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				env( value );
			};
		}
	});

	it( 'should return a configuration object', function test() {
		var expected,
			actual,
			o;

		expected = {
			'akey': '1234',
			'server': {
				'port': 7331
			},
			'logger': {
				'level': 'info'
			}
		};

		o = process.env;
		process.env = {
			'API_KEY': '1234',
			'PORT': '7331',
			'LOG_LEVEL': 'info'
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should parse numbers', function test() {
		var expected,
			actual,
			o;

		o = process.env;
		process.env = {
			'NUM': '1234'
		};

		expected = {
			'num': 1234
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should throw an error if unable to parse an environment variable specified as a number', function test() {
		var o = process.env;
		process.env = {
			'NUM': 'true'
		};
		expect( badValue ).to.throw( TypeError );
		process.env = o;
		function badValue() {
			env( map );
		}
	});

	it( 'should parse booleans', function test() {
		var expected,
			values,
			actual,
			ch,
			o,
			i;

		values = [
			'true',
			'TRUE',
			'True',
			'T',
			't',
			'false',
			'FALSE',
			'False',
			'F',
			'f'
		];

		expected = {
			'bool': null
		};

		o = process.env;
		for ( i = 0; i < values.length; i++ ) {
			ch = values[ i ][ 0 ].toLowerCase();
			process.env = {
				'BOOL': values[ i ]
			};
			actual = env( map );
			expected.bool = ( ch === 't' ) ? true : false;
			assert.deepEqual( actual, expected, values[ i ] );
		}
		process.env = o;
	});

	it( 'should throw an error if unable to parse an environment variable specified as a boolean', function test() {
		var o = process.env;
		process.env = {
			'BOOL': 'beepboop'
		};
		expect( badValue ).to.throw( TypeError );
		process.env = o;
		function badValue() {
			env( map );
		}
	});

	it( 'should parse objects', function test() {
		var expected,
			actual,
			o;

		o = process.env;
		process.env = {
			'OBJ': '{"beep":"boop"}'
		};

		expected = {
			'obj': {
				'beep': 'boop'
			}
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should parse objects (arrays)', function test() {
		var expected,
			actual,
			o;

		o = process.env;
		process.env = {
			'ARR': '[1,2,3,4]'
		};

		expected = {
			'arr': [ 1, 2, 3, 4 ]
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should parse objects (nested)', function test() {
		var expected,
			actual,
			o;

		o = process.env;
		process.env = {
			'NESTED': '{"hello":"world"}'
		};

		expected = {
			'a': {
				'b': {
					'c': {
						'd': {
							'hello': 'world'
						}
					}
				}
			}
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should throw an error if unable to parse an environment variable specified as an object', function test() {
		var o = process.env;
		process.env = {
			'OBJ': '{"beep:"boop"}'
		};
		expect( badValue ).to.throw( TypeError );
		process.env = o;
		function badValue() {
			env( map );
		}
	});

	it( 'should return an empty object if no environment variables map those specified in the mapping object', function test() {
		var o = process.env;
		process.env = {};
		assert.deepEqual( env( map ), {} );
		process.env = o;
	});

});
