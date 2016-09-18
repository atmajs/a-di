var BaseMethodEntry = require('./BaseMethodEntry');
var ParamResolver = require('../Params/ParamResolver');

module.exports = class FnEntry extends BaseMethodEntry {
	constructor (container, fn) {	
		super(...arguments);
		this.Fn = fn;
	}

	get Entry () {
		return this.Fn
	}

	resolve (...args) {
		var params = this.getParams_(...args);
		return this.Fn.call(null, ...params);
	}

	wrap () {
		return this.resolve.bind(this);
	}
};