var series = require('./series');
var Interface = require('./interface');

function Wizard() {

}

Wizard.run = run;

function run(defaultValues) {
	if (!defaultValues) {
		defaultValues = {};
	}
	var fieldNames = ['name', 'version', 'description', 'author', 'license'];
	var interface = Interface.create();
	var steps = fieldNames.map(function (fieldName) {
		var defaultValue = defaultValues[fieldName];
		return function () {
			return interface.question(createPromptString(fieldName, defaultValue));
		};
	});
	return series(steps)
		.then(function (values) {
			var config = {};
			for (var i = 0; i < fieldNames.length; i++) {
				var fieldName = fieldNames[i];
				config[fieldName] = values[i] || defaultValues[fieldName] || '';
			}
			return config;
		})
		.finally(function(){
			interface.close();
		});
}

function createPromptString(fieldName, defaultValue) {
	var string = fieldName + ': ';
	if (Boolean(defaultValue)) {
		string += '(' + defaultValue + ') ';
	}
	return string;
}

module.exports = Wizard;