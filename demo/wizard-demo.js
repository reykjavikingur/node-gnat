var Wizard = require('../lib/wizard');

Wizard.run({
	//*
	name: 'my-app',
	version: '1.0.0',
	description: 'A starter kit for apps',
	author: '',
	license: 'ISC'
	//*/
})
	.then(function (r) {
		console.log('Wizard run successful:', r);
	}, function (e) {
		console.error('Wizard run failed:', e.message);
	})
;