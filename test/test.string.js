/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/string.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'string', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse strings', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'beep',
			'boop',
			'bop',
			'bap',
			'Hello world'
		];
		expected = [
			'beep',
			'boop',
			'bop',
			'bap',
			'Hello world'
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.strictEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if provided a `enum` option which is not a string array', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			NaN,
			true,
			null,
			// undefined,
			[],
			['a',null],
			['1',2],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( 'beep', {
				'enum': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if an environment variable is not one of a predefined set of values', function test() {
		var err = parse( 'beep', {
			'enum': ['a','b','c']
		});
		assert.isTrue( err instanceof Error );
	});

	it( 'should return a value which matches a value within a set of predefined values', function test() {
		var v = parse( 'b', {
			'enum': ['a','b','c']
		});
		assert.strictEqual( v, 'b' );
	});

});
