function PackageData(pkg) {

	return {
		detach: detach,
		findGitUrl: findGitUrl
	};

	function detach(name) {
		if (!name) {
			throw new Error('must provide name of module being detached');
		}
		pkg.name = name;
		pkg.version = '1.0.0';
		delete pkg.repository;
	}

	function findGitUrl() {
		var repo = pkg.repository;
		if (!repo) {
			throw new Error('repository not found')
		}
		if (repo.type !== 'git') {
			throw new Error('repository not of type git');
		}
		return repo.url.replace('git+', '');
	}
}

module.exports = PackageData;