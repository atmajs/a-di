var BaseMethodEntry = require('./BaseMethodEntry');
var opts = require('../const');

module.exports = class TypeEntry extends BaseMethodEntry {
	constructor (di, Type) {
		super(...arguments);
		this.Type = Type;		
	}	

	get Entry () {
		return this.Type;
	}

	resolve (...args) {
		var params = this.getParams_(...args);

		return new this.Type(...params);
	}


	wrap () {
		var self = this;
		return function (...args) {
			return self.resolve(...args);
		};
	}
};