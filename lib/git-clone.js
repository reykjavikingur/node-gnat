var assert = require('assert');
var Promise = require('promise');
var execFile = require('child_process').execFile;

function gitClone(url, path) {
	return new Promise(function (resolve, reject) {
		assert(Boolean(url), 'must provide url to git clone command');
		assert(Boolean(path), 'must provide path to git clone command');
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

module.exports = gitClone;