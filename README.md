Environment Variables
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Maps [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to a configuration object.


## Installation

``` bash
$ npm install env-to-object
```


## Usage

``` javascript
var env = require( 'env-to-object' );
```

#### env( map )

Maps [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to a configuration `object`.

``` javascript
var map = {
	'NODE_ENV': {
		'keypath': 'env',
		'type': 'string'
	},
	'PORT': {
		'keypath': 'server.port',
		'type': 'number'
	},
	'SSL': {
		'keypath': 'server.ssl',
		'type': 'boolean'
	},
	'LOGLEVEL': {
		'keypath': 'logger.level',
		'type': 'string'
	}
};

var out = env( map );
/*
	{
		'env': <string>,
		'server': {
			'port': <number>,
			'ssl': <boolean>
		},
		'logger': {
			'level': <string>
		}
	}
*/
```

An [environment variable](https://en.wikipedia.org/wiki/Environment_variable) mapping __must__ include a `keypath`, which is a dot-delimited `object` path. By default, this module parses an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) value as a `string`. The following types are supported:

*	__string__: (__default__) coerce an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) value to a `string`. 
*	__number__: coerce an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) value to a `number`.
*	__boolean__: coerce an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) value to a `boolean`. The following values are supported:
	-	`TRUE`
	-	`True`
	-	`true`
	-	`T`
	-	`t`
	-	`FALSE`
	-	`False`
	-	`false`
	-	`F`
	-	`f`
*	__object__: [parse](https://github.com/kgryte/utils-json-parse) an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) value as a JSON `object`. Note that a value must be valid [JSON](https://github.com/kgryte/utils-json-parse).


## Examples

``` javascript
var env = require( 'env-to-object' );

var map = {
	'DEFAULT': {
		'keypath': 'default'
	},
	'STR': {
		'keypath': 'str',
		'type': 'string'
	},
	'NUM': {
		'keypath': 'num',
		'type': 'number'
	},
	'BOOL': {
		'keypath': 'bool',
		'type': 'boolean'
	},
	'ARR': {
		'keypath': 'arr',
		'type': 'object'
	},
	'NESTED': {
		'keypath': 'a.b.c.d',
		'type': 'object'
	}
};

process.env[ 'DEFAULT' ] = 'beep';
process.env[ 'STR' ] = 'boop';
process.env[ 'NUM' ] = '1234.5';
process.env[ 'BOOL' ] = 'true';
process.env[ 'ARR' ] = '[1,2,3,4]';
process.env[ 'NESTED' ] = '{"hello":"world"}';

var out = env( map );
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/env-to-object.svg
[npm-url]: https://npmjs.org/package/env-to-object

[travis-image]: http://img.shields.io/travis/kgryte/node-env-to-object/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-env-to-object

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/node-env-to-object/master.svg
[codecov-url]: https://codecov.io/github/kgryte/node-env-to-object?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-env-to-object.svg
[dependencies-url]: https://david-dm.org/kgryte/node-env-to-object

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-env-to-object.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-env-to-object

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-env-to-object.svg
[github-issues-url]: https://github.com/kgryte/node-env-to-object/issues
