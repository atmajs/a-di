var BaseMethodEntry = require('./BaseMethodEntry');
var ParamResolver = require('../Params/ParamResolver');

module.exports = class_create(BaseMethodEntry, {
	constructor (container, fn) {	
		this.Fn = fn;
	},

	get Entry () {
		return this.Fn
	},

	resolve (...args) {
		var args = _Array_slice.call(arguments),
			params = this.getParams_.apply(this, args);
		return this.Fn.apply(null, params);
	},

	wrap () {
		return this.resolve.bind(this);
	}
});