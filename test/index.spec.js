var should = require('should');

var gnat = require('../');

describe('gnat', function () {

	it('should be defined', function () {
		should(gnat).be.ok();
	});

	describe('.clone', function () {
		should(gnat.clone).be.a.Function();
	});

});