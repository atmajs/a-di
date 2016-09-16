var Entry = require('./Entry');
var ParamResolver = require('../Params/ParamResolver');

module.exports = class FnEntry extends Entry {
	constructor (container, fn) {	
		super(...arguments);
		this.Fn = fn;
	}

	resolve (...args) {
		var arr = this.resolvers,
			imax = arr.length,
			i = -1,
			imax = arr.length,
			params = new Array(args.length > imax ? args.length : imax);
		while(++i < imax) {
			var arg = args.length > i ? args[i] : void 0;
			params[i] = this.resolvers[i].resolve(arg);
		}
		imax = args.length;
		i--;
		while(++i < imax) {
			params[i] = args[i];
		}
		return this.Fn.call(null, ...params);
	}

	wrap () {
		return this.resolve.bind(this);
	}
}