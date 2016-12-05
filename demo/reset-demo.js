var reset = require('../lib/reset-package');

var pkg = {
	"name": "static-site-generator",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"postinstall": "bower update",
		"start": "gulp clean && gulp serve",
		"build": "gulp clean && gulp build",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/reykjavikingur/static-site-generator.git"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {
		"bower": "^1.7.9",
		"browser-sync": "^2.17.5",
		"chalk": "^1.1.3",
		"del": "^2.2.2",
		"gulp": "^3.9.1",
		"gulp-bower-normalize": "^1.1.1",
		"gulp-sass": "^2.3.2",
		"gulp-util": "^3.0.7",
		"handlebars": "^4.0.5",
		"handlebars-generator": "^3.1.1",
		"main-bower-files": "^2.13.1",
		"underscore": "^1.8.3"
	}
};

reset(pkg)
	.then(function (r) {
		console.log('reset successful:', r);
	}, function (e) {
		console.error('reset failed:', e);
	})
;