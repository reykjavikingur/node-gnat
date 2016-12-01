function PackageFile(name) {

	if (!name) {
		throw new Error('package name not provided');
	}

	return {
		resolve: resolve
	};

	function resolve(mainPath) {
		var subpath = '/node_modules/' + name;
		var i = mainPath.lastIndexOf(subpath);
		if (i < 0) {
			throw new Error('unable to find package.json in path');
		}
		return mainPath.substr(0, i) + subpath + '/package.json';
	}
}

module.exports = PackageFile;