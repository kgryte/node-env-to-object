/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var map = require( './fixtures/env.json' );
var env = require( './../lib' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'env-to-object', function tests() {

	it( 'should export a function', function test() {
		expect( env ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a map object', function test() {
		var values;
		var i;

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

	it( 'should throw an error if provided an invalid options argument', function test() {
		var values;
		var i;

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
				env( {}, value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values;
		var i;

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
				env( {}, {
					'parsers': value
				});
			};
		}
	});

	it( 'should return a configuration object', function test() {
		var expected;
		var actual;
		var o;

		expected = {
			'akey': '1234',
			'server': {
				'port': 7331
			},
			'logger': {
				'level': 'info'
			},
			'beep': 'boop',
			'str': 'hello world',
			'num': 5.5,
			'bool': true,
			'arr': [1,2,3,'4'],
			'obj': {
				'hello': 'world'
			},
			'a': {
				'b': {
					'c': {
						'd': {
							'be': 'bop'
						}
					}
				}
			},
			'date': new Date( '2015-10-18' ),
			're': /\w+/,
			'int': -11,
			'min': 0.5,
			'max': 1,
			'emin': 1024,
			'emax': 65535.9,
			'oneof': 'beep',
			'oneof2': 9000
		};

		o = process.env;
		process.env = {
			'API_KEY': '1234',
			'PORT': '7331',
			'LOG_LEVEL': 'info',
			'BEEP': 'boop',
			'STR': 'hello world',
			'NUM': '5.5',
			'BOOL': 'TRUE',
			'ARR': '[1,2,3,"4"]',
			'OBJ': '{"hello":"world"}',
			'NESTED': '{"be":"bop"}',
			'DATE': '2015-10-18',
			'REGEX': '/\\w+/',
			'INT': '-11',
			'MIN': '0.5',
			'MAX': '1',
			'EMIN': '1024',
			'EMAX': '65535.9',
			'ONEOF': 'beep',
			'ONEOF2': '9000',
			'UNRECOGNIZED': 'woot'
		};

		actual = env( map );

		assert.deepEqual( actual, expected );

		process.env = o;
	});

	it( 'should support custom type parsers', function test() {
		var expected;
		var actual;
		var o;

		o = process.env;
		process.env = {
			'CUSTOM': '5'
		};

		expected = {
			'custom': 30
		};
		actual = env( map, {
			'parsers': {
				'custom_type': parse
			}
		});
		assert.deepEqual( actual, expected );

		process.env = o;

		function parse( str ) {
			return parseFloat( str ) * 6;
		}
	});

	it( 'should throw an error if an environment variable cannot be parsed as a specified type', function test() {
		var o;

		o = process.env;
		process.env = {
			'INT': 'beepboop'
		};
		expect( badValue ).to.throw( TypeError );
		process.env = o;

		function badValue() {
			env( map );
		}
	});

	it( 'should throw an error if an environment variable has an unrecognized/unsupported type', function test() {
		var o;

		o = process.env;
		process.env = {
			'UNRECOGNIZED_TYPE': 'beepboop'
		};
		expect( badValue ).to.throw( Error );
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
