var BaseMethodEntry = require('./BaseMethodEntry');
var opts = require('../const');

module.exports = class_create(BaseMethodEntry, {
	
	constructor (di, Type) {
		this.Type = Type;		
	},

	get Entry () {
		return this.Type;
	},

	resolve (...args) {
		var args = _Array_slice.call(arguments),
			params = this.getParams_.apply(this, args),
			Ctor = this.Type;
		return new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
	},

	wrap () {
		var self = this;
		return function () {
			return self.resolve.apply(this, arguments);
		};
	}
});