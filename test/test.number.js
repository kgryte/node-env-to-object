/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'number', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( '5', values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid option', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( '5', {
				'emin': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should parse numbers', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'5.2',
			'1000',
			'0',
			'-1.5',
			'-1000.123'
		];
		expected = [
			5.2,
			1000,
			0,
			-1.5,
			-1000.123
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.strictEqual( actual, expected[ i ], values[ i ] );

			actual = parse( values[ i ], {} );
			assert.strictEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if unable to parse a string as a number', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

	it( 'should return an error if a value is less than a minimum value', function test() {
		var err = parse( '0', {
			'min': 1
		});
		assert.isTrue( err instanceof RangeError );
	});

	it( 'should return an error if a value is greater than a maximum value', function test() {
		var err = parse( '2', {
			'max': 1
		});
		assert.isTrue( err instanceof RangeError );
	});

	it( 'should return an error if a value is less than or equal to an exclusive minimum value', function test() {
		var err = parse( '1', {
			'emin': 1
		});
		assert.isTrue( err instanceof RangeError );
	});

	it( 'should return an error if value is greater than or equal to an exclusive maximum value', function test() {
		var err = parse( '2', {
			'emax': 2
		});
		assert.isTrue( err instanceof RangeError );
	});

	it( 'should return an error if a value is not one of a predefined set of values', function test() {
		var err = parse( '2', {
			'oneof': [1,3,4]
		});
		assert.isTrue( err instanceof Error );
	});

	it( 'should return a numeric value which matches a value within a set of predefined values', function test() {
		var v = parse( '2.2', {
			'oneof': [1,2.2,3]
		});
		assert.strictEqual( v, 2.2 );
	});

	it( 'should return a numeric value which satisfies an exclusive minimum', function test() {
		var v = parse( '2', {
			'emin': 1
		});
		assert.strictEqual( v, 2 );
	});

	it( 'should return a numeric value which satisfies an exclusive maximum', function test() {
		var v = parse( '2', {
			'emax': 3
		});
		assert.strictEqual( v, 2 );
	});

	it( 'should return a numeric value which satisfies a minimum value criterion', function test() {
		var v = parse( '2', {
			'min': 2
		});
		assert.strictEqual( v, 2 );
	});

	it( 'should return a numeric value which satisfies a maximum value criterion', function test() {
		var v = parse( '2', {
			'max': 2
		});
		assert.strictEqual( v, 2 );
	});

});
