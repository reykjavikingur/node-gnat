#!/usr/bin/env node

var clone = require('./lib/clone');

/*
 This is the file for the bin command "gnat" that is installed globally.
 It has actions including "clone" and later will have "init".
 The "clone" action will take a Git URL and a path
 clone from git to the path
 then open "package.json" in the path
 and make modifications.
 */

var args = process.argv.slice(2);

if (args.length === 0) {
	usage();
	process.exit(0);
}
else {
	var action = args[0];
	if (action === 'clone') {
		var url = args[1];
		var path = args[2];
		if (!url || !path) {
			console.error('invalid arguments');
			usage();
			process.exit(1);
		}
		clone(url, path)
			.then(function () {
				console.log('clone action completed');
			}, function (e) {
				console.error('clone action failed:', e.message);
			})
		;
	}
	else {
		console.error('invalid action');
		usage();
		process.exit(1);
	}
}

function usage() {
	console.log('Usage:');
	console.log('gnat clone git-url target-path');
}
