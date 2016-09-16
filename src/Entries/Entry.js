var ParamResolver = require('../Params/ParamResolver');

module.exports = class Entry {
	
	constructor (container) {
		this.container = container;
		this._as = [];
		this._using = [];
		this.onActivated = null;
		//this.resolver = this.resolve.bind(this);
		this.resolvers = [];
	}

	using (...args) {
		this._using.push(...args);


		var resolvers = new Array(args.length),
			imax = args.length,
			i = -1;
		while( ++i < imax ) {
			resolvers[i] = ParamResolver.create(this.container, args[i]);
		}

		this.resolvers.push(...resolvers);	
		return this;
	}

	as (...args) {
		this._as.push(...args);

		var i = args.length, entries = this.container.entries;
		while(--i > -1) {
			entries.registerFor(args[i], this);			
		}
		return this;
	}

	register () {
		throw new Error('Not implemented');
	}

	asSelf () {
		throw new Error('Not implemented');
	}

	resolve () {
		throw new Error('Not implemented');
	}

	onActivated (fn) {
		this.onActivated = fn;
	}
}