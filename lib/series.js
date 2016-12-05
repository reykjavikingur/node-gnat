var Promise = require('promise');

/**
 * Takes Array of Function that return Promise
 * and invokes each in turn,
 * returning a Promise that resolves to Array of their resolutions
 * @param pfs
 */
function series(pfs) {
	if (pfs.length === 0) {
		return Promise.resolve([]);
	}
	else {
		pfs = pfs.slice(0);
		var pf = pfs.pop();
		return series(pfs)
			.then(function (rs) {
				return pf()
					.then(function (r) {
						rs.push(r);
						return rs;
					})
					;
			})
			;
	}
}

module.exports = series;