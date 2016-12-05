var resetFile = require('../lib/reset-package-file');

var args = process.argv.slice(2);
var path = args[0];
if (!path) {
	console.error('must provide path');
	process.exit(1);
}

resetFile(path, {
	overwrite: false
})
	.then(function (r) {
		console.log('reset successful', r);
	}, function (e) {
		console.error('reset failed:', e);
	})
;