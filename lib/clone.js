var assert = require('assert');
var del = require('del');
var gitClone = require('./git-clone');
var resetPackageFile = require('./reset-package-file');

function clone(url, path) {
	assert(Boolean(url), 'clone action missing url');
	assert(Boolean(path), 'clone action missing path');
	return gitClone(url, path)
		.then(function () {
			return del(path + '/.git');
		})
		.then(function () {
			return resetPackageFile(path + '/package.json');
		})
		;

}

module.exports = clone;