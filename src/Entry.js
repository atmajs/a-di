module.exports = class Entry {
	
	constructor (container) {
		this.container = container;
		this._as = [];
		this._using = [];
		this.onActivated = null;
		this.resolver = this.resolve.bind(this);
		this.resolvers = [];
	}

	using (...args) {
		this._using.push(...args);

		var resolvers = this
			.container
			.entries
			.getResolvers(...args);

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