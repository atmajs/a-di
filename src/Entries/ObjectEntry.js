var Entry = require('./Entry');
var ParamResolver = require('../Params/ParamResolver');

module.exports = class ObjectEntry extends Entry {
	constructor (container, object) {	
		super(...arguments);
		this.Object = object;
	}

	using (objectDefinitions) {
		if (arguments.length !== 1) {
			throw new Error('Invalid argument count in using for an ObjectEntry');
		}
		for (var key in objectDefinitions) {
			var paramResolver =  ParamResolver.create(container, objectDefinitions[key]);
			this.resolvers.push([key, paramResolver]);
		}
	}

	resolve (currentObject) {
		var object = Object.create(this.Object);
		var arr = this.resolvers,
			i = arr.length;
		while(--i > -1) {
			var resolverEntry = this.resolvers[i];
			var key = resolverEntry[0],
				Resolver = resolverEntry[1];

			var arg = currentObject == null ? null : currentObject[key];
			var val = Resolver.resolve(arg);

			object[key] = val;
		}
		for (var key in currentObject) {
			if (object[key] == null) {
				object[key] = currentObject[key];
			}
		}
		return object;
	}

	wrap () {
		return this.resolve.bind(this);
	}

}