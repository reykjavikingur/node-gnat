var should = require('should');
var PackageData = require('../lib/package-data');

describe('PackageData', function () {

	describe('empty', function () {

		var pkg, instance;

		beforeEach(function () {
			pkg = {};
			instance = PackageData(pkg);
		});

		describe('.findGitUrl', function () {
			it('should throw error', function () {
				should(function () {
					instance.findGitUrl();
				}).throw();
			});
		});

	});

	describe('normal', function () {

		var pkg, instance;

		beforeEach(function () {
			pkg = {
				name: 'abc',
				version: '2.1.3',
				repository: {
					type: 'git',
					url: 'https://github.com/my/stuff.git'
				}
			};
			instance = PackageData(pkg);
		});

		describe('.findGitUrl', function () {
			it('should return correct value', function () {
				should(instance.findGitUrl()).eql('https://github.com/my/stuff.git');
			});
		});

		describe('.detach', function () {

			it('should throw error without name', function () {
				should(function () {
					instance.detach();
				}).throw();
			});

			describe('with new name', function () {
				beforeEach(function () {
					instance.detach('foo');
				});
				it('should change name', function () {
					should(pkg.name).eql('foo');
				});
				it('should reset version', function () {
					should(pkg.version).eql('1.0.0');
				});
				it('should clear repository', function () {
					should(pkg.repository).be.undefined();
					should(pkg.hasOwnProperty('repository')).not.be.ok();
				});
			});

		});

	});

	describe('with git+ prefix', function () {

		var pkg, instance;

		beforeEach(function () {
			pkg = {
				name: 'abx',
				version: '1.1.4',
				repository: {
					type: 'git',
					url: 'git+https://github.com/person/thing.git'
				}
			};
			instance = PackageData(pkg);
		});

		describe('.findGitUrl', function () {
			it('should return correct value', function () {
				should(instance.findGitUrl()).eql('https://github.com/person/thing.git');
			});
		});

	});

});