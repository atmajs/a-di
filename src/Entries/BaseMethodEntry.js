var Entry = require('./Entry');
var opts = require('../const');


module.exports = class_create(Entry, {

	constructor (di, Entry) {		
		if (typeof Entry !== 'function') {
			throw new Error('Invalid argument. Function expected');
		}
		
		var using = di.metaReader.readFromType(Entry);
		if (using != null) {
			this.using.apply(this, using);
		}
	},

	withParams () {
		this._params = _Array_slice.call(arguments);
		return this;
	},

	getParams_ () {
		var args = _Array_slice.call(arguments),
			resolvers = this._resolvers,
			params = this._params;


		var argsIgnore = this.cfg_arguments === opts.args.IGNORE,
			argsExtend = this.cfg_arguments === opts.args.EXTEND,
			argsOverride = this.cfg_arguments === opts.args.OVERRIDE;

		var size = resolvers.length;
		if (size < params.length) size = params.length;
		if (argsIgnore === false) {
			if (argsExtend) {
				size += args.length;
			}
			if (argsOverride && args.length > size) {
				size = args.length;
			}
		}
		
		var ctorParams = new Array(size);
		var i = -1;
		while ( ++i < size ) {

			if (i < params.length && params[i] != null) {
				var arg = argsIgnore === false && i < args.length && args[i] != null 
					? args[i] 
					: params[i];
				ctorParams[i] = arg;
				continue;
			}
			if (i < resolvers.length && resolvers[i] != null) {
				var arg = argsIgnore === false && i < args.length 
					? args[i] 
					: void 0;
				ctorParams[i] = resolvers[i].resolve(arg);
				continue;
			}
			if (argsIgnore) {
				continue;
			}			
			if (argsOverride && i < args.length) {
				ctorParams[i] = args[i];
				continue;
			}
			if (argsExtend && i >= size - args.length) {
				var j = i - size - args.length;
				ctorParams[i] = args[j];
				continue;
			}
		}
		
		var Fn = this.Entry,
			expect = Fn.length;
		if (expect > size) {
			throw new Error(`Not enough arguments for Method ${Fn.name}. Have ${size}. Expect ${expect}`);
		}
		
		return ctorParams;
	}
});