var readline = require('readline');
var Promise = require('promise');

function Interface() {
	this.rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
}

Interface.create = create;

Interface.prototype = {
	close: close,
	question: question
};

// STATIC METHODS

function create() {
	return new Interface();
}

// INSTANCE METHODS

function question(q) {

	return new Promise(function (resolve) {

		this.rl.question(q, function (answer) {
			resolve(answer);
		}.bind(this));

	}.bind(this));

}

function close() {
	this.rl.close();
}

module.exports = Interface;