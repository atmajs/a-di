var Entry = require('./Entry');

module.exports = class TypeEntry extends Entry {
	constructor (container, Type) {
		if (typeof Type !== 'function') {
			throw new Error('Invalid argument. Function expected');
		}
		
		super(...arguments);
		this.Type = Type;
		var using = container.metaReader.readFromType(Type);
		if (using != null) {
			this.using(...using);
		}
	}

	resolve (...args) {
		var arr = this.resolvers,
			imax = arr.length,
			params = new Array(imax > args.length ? imax : args.length),
			i = -1;
		while(++i < imax) {
			var arg = args.length > i ? args[i] : void 0;
			params[i] = this.resolvers[i].resolve(arg);
		}
		imax = args.length;
		i--;
		while(++i < imax) {
			params[i] = args[i];
		}

		var Ctor = this.Type,
			expect = Ctor.length,
			actual = params.length;
		if (expect > actual) {
			throw new Error(`Not enough arguments for Type ${Ctor.name}. Have ${actual}. Expect ${expect}`);
		}
		
		return new Ctor(...params);
	}

	asSelf () {
		this.container.entries.registerFor(this.Type, this);
		return this;
	}

	wrap () {
		var self = this;
		return function (...args) {
			return self.resolve(...args);
		};
	}

	register () {
		var coll = this.container.entries;
		coll.removeForType(this.Type);
		coll.add(this);
		return this;
	}
}