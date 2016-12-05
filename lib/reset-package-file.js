var _ = require('underscore');
var fs = require('fs');
var Promise = require('promise');
var Path = require('path');
var resetPackage = require('./reset-package');

function resetPackageFile(path, options) {
	options = _.defaults({}, options, {
		overwrite: true // whether to modify the file
	});
	var name = Path.basename(Path.dirname(path));
	return readFile(path)
		.then(function (string) {
			var pkg = JSON.parse(string);
			return resetPackage(pkg, name);
		})
		.then(function (pkg) {
			var string = JSON.stringify(pkg, null, '  ');
			if (options.overwrite) {
				return writeFile(path, string);
			}
			else {
				console.log(string);
			}
		})
		;
}

function readFile(path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		})
	});
}

function writeFile(path, string) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(path, string, 'utf8', function (err) {
			if (err) {
				reject(err);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports = resetPackageFile;
