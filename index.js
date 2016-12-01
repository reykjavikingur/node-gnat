var fs = require('fs');
var Path = require('path');
var Promise = require('promise');
var execFile = require('child_process').execFile;
var del = require('del');
var PackageData = require('./lib/package-data');

var gnat = {
	clone: clone
};

function clone(gitUrl, targetPath) {

	if (!gitUrl) {
		throw new Error('missing git URL');
	}

	if (!targetPath) {

		// look for target path in command line argument
		targetPath = process.argv[2];

		if (!targetPath) {
			// still not set?
			throw new Error('missing target path');
		}

		if (targetPath.indexOf('/') >= 0) {
			// descend only one directory level, please
			throw new Error('invalid target path');
		}
	}

	return Promise.resolve()

		.then(function () {
			return checkTargetAvailability(targetPath);
		})

		.then(function () {
			return gitClone(gitUrl, targetPath);
		})

		.then(function () {
			return del(targetPath + '/.git');
		})

		.then(function () {
			var packagePath = process.cwd() + '/' + targetPath + '/package.json';
			var pkg = require(packagePath);
			var packageData = PackageData(pkg);
			packageData.detach(targetPath);
			return writeJsonFile(packagePath, pkg);
		})

		;
}

function checkTargetAvailability(path) {
	return new Promise(function (resolve, reject) {
		fs.stat(path, function (err, stats) {
			if (err) {
				resolve();
			}
			else {
				reject(new Error('target path is not available'));
			}
		});
	});
}

function gitClone(url, path) {
	return new Promise(function (resolve, reject) {
		console.log('git', 'clone', url, path);
		execFile('git', ['clone', url, path], function (error, stdout, stderr) {
			if (error) {
				reject(error);
			}
			else {
				console.log(stdout);
				resolve();
			}
		});
	});
}

function writeJsonFile(path, data) {
	return new Promise(function (resolve, reject) {
		var output = JSON.stringify(data, null, '  ');
		fs.writeFile(path, output, 'utf8', function (err) {
			if (err) {
				reject(err);
			}
			else {
				resolve();
			}
		});
	});
}

module.exports = gnat;