/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var validate = require( './../lib/validate.number.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'validate: number', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
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
			undefined,
			null,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `oneof` option which is not a number array', function test() {
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
			[1,NaN],
			[1,'2'],
			[1,null],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'oneof': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a minimum value which is not a number primitive', function test() {
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
			err = validate( {}, {
				'min': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a maximum value which is not a number primitive', function test() {
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
			err = validate( {}, {
				'max': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an exclusive minimum value which is not a number primitive', function test() {
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
			err = validate( {}, {
				'emin': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an exclusive maximum value which is not a number primitive', function test() {
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
			err = validate( {}, {
				'emax': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return `null` if provided valid options', function test() {
		var err;

		err = validate( {}, {
			'min': 0,
			'max': 1,
			'emin': 0,
			'emax': 1,
			'oneof': [1,Math.PI]
		});
		assert.isNull( err );

		// Misc options:
		err = validate( {}, {
			'beep': 'boop',
			'bap': 'bup'
		});
		assert.isNull( err );
	});

});
