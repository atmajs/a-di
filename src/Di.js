var TypeEntry = require('./TypeEntry');
var Collection = require('./EntryCollection')

module.exports = class Di {
	constructor (container = null) {
		this.childContainer = container;
		this.entries = new Collection();
		
	}

	registerType (Type) {
		var current = this.entries.getByType(Type);
		if (current == null) {
			current = new TypeEntry(this, Type)
			this.entries.add(current);
		}
		return current;
	}

	getType (Type) {
		if (typeof Type !== 'function') {
			throw new Error('Invalid argument. Function or Constructor is expected.');
		}
		var resolver = this.entries.getFor(Type, true).resolver;
		return function (...args) {
			return resolver.call(this, ...args);
		};
	}

	resolve (mix) {
		return this.entries.resolve(mix);
	}


	wrapFunction (...args) {
		var fn = args.pop();
		
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
}

