var ObjectEntry = require('./Entries/ObjectEntry');
var TypeEntry = require('./Entries/TypeEntry');
var FnEntry = require('./Entries/FnEntry');

var MetaReader = require('./Entries/MetaReader');
var EntryCollection = require('./Entries/EntryCollection');

module.exports = class Di {
	constructor (container = null) {
		this.childContainer = container;
		this.entries = new EntryCollection();
		this.metaReader = new MetaReader();	
	}

	registerType (Type) {
		return this.Type(Type).register();
	}
	registerFactory (Fn) {
		return this.Function(Fn).register();
	}

	Type (Type) {
		return new TypeEntry(this, Type);
	}

	Function (fn) {
		return new FnEntry(this, fn);
	}

	Object (object) {
		return new ObjectEntry(this, object);
	}

	resolve (mix) {
		return this.entries.resolve(mix);
	}

	wrapType (Type) {
		return this.entries.getFor(Type).wrap();
	}

	/*
	wrapFunction (...args) {
		var fn = args.pop();
		if (typeof Type !== 'function') {
			throw new Error('Invalid argument. Function expected.');
		}
		
		var resolvers = this.entries.getResolvers(...args);
		var resolversCount = resolvers.length;
		
		return function(...overrides) {
			var overridesCount = overrides.length,
				paramsCount = resolversCount > overridesCount
				? resolversCount
				: overridesCount;

			var params = new Array(paramsCount);
			var i = -1;
			while( ++i < resolversCount ){
				if (i < overridesCount && overridesCount[i] != null) {
					params[i] = overridesCount[i];
					continue;
				}
				params[i] = resolvers[i]();
			}
			i--;
			while(++i < overridesCount) {
				params[i] = overridesCount[i];
			}

			return fn.call(this, ...params);
		}
	}
	*/
}

