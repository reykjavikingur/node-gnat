var fs = require('fs');
var Path = require('path');
var Promise = require('promise');
var execFile = require('child_process').execFile;
var del = require('del');
var PackageData = require('./lib/package-data');
var PackageFile = require('./lib/package-file');

var gnat = {
	detach: detach
};

function detach(sourcePackageName, targetPath) {

	var packageFile, pkg, packageData;

	return new Promise(function (resolve, reject) {

		console.log('detaching', sourcePackageName);

		if (!targetPath) {
			targetPath = process.argv[2]; // look for target path in first command line argument to the app

			if (!targetPath) {
				throw new Error('missing target path');
			}

			if (targetPath.indexOf('/') >= 0) {
				throw new Error('invalid target path');
			}
		}

		packageFile = PackageFile(sourcePackageName);

		var packagePath = packageFile.resolve(require.resolve(sourcePackageName));

		pkg = require(packagePath);

		packageData = PackageData(pkg);

		resolve();

	})

		.then(function () {
			return checkTargetAvailability(targetPath);
		})

		.then(function () {
			return gitClone(packageData, targetPath);
		})

		.then(function () {
			return del(targetPath + '/.git');
		})

		.then(function () {
			packageData.detach(targetPath);
			writePackage(pkg, targetPath);
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

function gitClone(packageData, path) {
	return new Promise(function (resolve, reject) {
		var url = packageData.findGitUrl();
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

function writePackage(pkg, targetPath) {
	return new Promise(function (resolve, reject) {
		var packagePath = process.cwd() + '/' + targetPath + '/package.json';
		var output = JSON.stringify(pkg, null, '  ');
		fs.writeFile(packagePath, output, 'utf8', function (err) {
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