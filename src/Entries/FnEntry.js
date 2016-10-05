var BaseMethodEntry = require('./BaseMethodEntry');
var ParamResolver = require('../Params/ParamResolver');
var Arr = require('../utils/arr');
var { create: class_create } = require('../utils/class');

module.exports = class_create(BaseMethodEntry, {
	constructor (container, fn) {	
		this.Fn = fn;
	},

	get Entry () {
		return this.Fn
	},

	resolve (...args) {
		var args = Arr.from(arguments),
			params = this.getParams_.apply(this, args);
		return this.Fn.apply(null, params);
	},

	wrap () {
		return this.resolve.bind(this);
	}
});