var should = require('should');
var PackageFile = require('../lib/package-file');

describe('PackageFile', function () {

	it('should throw error without name', function () {
		should(function () {
			PackageFile();
		}).throw();
	});

	describe('with name', function () {

		var instance;

		beforeEach(function () {
			instance = PackageFile('foo');
		});

		describe('.resolve', function () {
			it('should return correct value given main path', function () {
				should(instance.resolve('/User/node/example-project/node_modules/foo/lib/foo.js'))
					.eql('/User/node/example-project/node_modules/foo/package.json');
			});
		});

	});

});