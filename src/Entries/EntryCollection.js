var is = require('../utils/is');

module.exports = class EntryCollection {
	constructor () {
		this.arr = [];
		this.ids = {};
		this.types = [];
	}

	add (entry) {
		this.arr.push(entry);
	}

	resolve (mix) {
		var entry = null;
		if (typeof mix === 'string') {
			entry = this.ids[entry];
		}
		if (typeof mix === 'function') {
			entry = this.getForType(mix);
		}
		if (entry == null) {
			throw Error(`Entry for Type '${mix.name}' not found`)
		}	
		return entry.resolve();
	}
/*
	getResolvers(...args) {
		var out = new Array(args.length),
			i = args.length;
		while( --i > -1) {
			out[i] = this.getResolver(args[i]);
		}
		return out;
	}

	getResolver (mix) {
		if (is.Object(mix)) {
			logger.log('RES'.cyan)
			return new PropertyResolver(mix, this).resolver;
		}
		return this.getFor(mix, true).resolver;
	}

	invokeResolvers (resolvers, overrides) {
		var resolversCount = resolvers.length,
			overridesCount = overrides.length,
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

		var arr = this.resolvers,
			i = arr.length,
			params = new Array(i);
		
		while(--i > -1) {
			params[i] = this.resolvers[i]();
		}
	}
*/
	getByType (Type) {
		var arr = this.arr,
			imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type)
				return x;
		}
		return null;
	}

	getFor (mix, required = false) {
		if (typeof mix === 'string') {
			var entry = this.ids[mix];
			if (required === true && entry == null) {
				throw Error(`Dependency is not registered "${mix}"`);
			}
			return entry;
		}
		if (typeof mix === 'function') {
			var entry = this.getForType(mix);
			if (required === true && entry == null) {
				throw Error(`Dependency is not registered "${mix.name}"`);
			}
			return entry;
		}
		throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
	}
	getForType (Type) {
		var arr = this.types,
			imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type)
				return x.entry;
		}
		return null;
	}
	removeForType(Type) {
		var arr = this.types,
			imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type) {
				arr.splice(i, 1);
				return;
			}
		}
		return;
	}	

	registerFor (mix, entry) {
		if (typeof mix === 'string') {
			this.ids[mix] = entry;
			return;
		}
		if (typeof mix === 'function') {
			this.types.push({
				Type: mix,
				entry: entry
			});
			return;
		}
		throw Error('Collection::registerFor. Unsupported value type: ' + (typeof mix));
	}

}