var _ = require('underscore');
var Wizard = require('./wizard');

/*
 - prompt for name, defaulting to basename of path
 - prompt for version, defaulting to 1.0.0
 - prompt for description, defaulting to whatever is already there
 - prompt for author, defaulting to empty string
 - prompt for license, defaulting to whatever is already there
 - keep existing fields: scripts, bin, main, dependencies, devDependencies, peerDependencies, bundledDependencies, optionalDependencies, files, directories, config, engines, engineStrict, os, cpu
 - remove all other fields, especially repository, keywords, homepage, bugs, contributors
 */

function resetPackage(pkg, name) {
	return Wizard.run({
		name: name,
		version: '1.0.0',
		description: pkg.description || '',
		author: '',
		license: pkg.license || ''
	})
		.then(function (answers) {
			return _.chain(answers)
				.defaults(pkg)
				.omit(['repository', 'keywords', 'homepage', 'bugs', 'contributors'])
				.value();
		});
}

module.exports = resetPackage;