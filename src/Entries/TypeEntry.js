var BaseMethodEntry = require('./BaseMethodEntry');
var opts = require('../const');
var Arr = require('../utils/arr');
var { create: class_create } = require('../utils/class');

module.exports = class_create(BaseMethodEntry, {
	
	constructor (di, Type) {
		this.Type = Type;		
	},

	Entry () {
		return this.Type;
	},

	resolve (...args) {
		var args = Arr.from(arguments),
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