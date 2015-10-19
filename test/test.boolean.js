/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/boolean.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'boolean', function tests() {

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
			err = parse( 'beep', values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid option', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( 'beep', {
				'strict': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should parse booleans', function test() {
		var expected;
		var values;
		var actual;
		var ch;
		var i;

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

		expected = null;
		for ( i = 0; i < values.length; i++ ) {
			ch = values[ i ][ 0 ].toLowerCase();
			actual = parse( values[ i ] );
			expected = ( ch === 't' ) ? true : false;
			assert.strictEqual( actual, expected, values[ i ] );
		}
	});

	it( 'should parse booleans (strict mode)', function test() {
		var expected;
		var values;
		var actual;
		var ch;
		var i;

		values = [
			'true',
			'false'
		];

		expected = null;
		for ( i = 0; i < values.length; i++ ) {
			ch = values[ i ][ 0 ];
			actual = parse( values[ i ], {
				'strict': true
			});
			expected = ( ch === 't' ) ? true : false;
			assert.strictEqual( actual, expected, values[ i ] );
		}
	});

	it( 'should return an error if unable to parse a string as a boolean', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

	it( 'should return an error if unable to parse a string as a boolean (strict mode)', function test() {
		var values;
		var err;
		var i;

		values = [
			'beep',
			'True',
			'TRUE',
			'T',
			'False',
			'FALSE',
			'F'
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( values[ i ], {
				'strict': true
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

});
