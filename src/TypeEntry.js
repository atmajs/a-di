var Entry = require('./Entry');

module.exports = class TypeEntry extends Entry {
	constructor (container, Type) {	
		super(...arguments);
		this.Type = Type;
	}

	resolve () {
		var arr = this.resolvers,
			i = arr.length,
			params = new Array(i);
		while(--i > -1) {
			var arg = arguments.length > i ? arguments[i] : void 0;
			params[i] = this.resolvers[i](arg);
		}	
		return new this.Type(...params);
	}

	asSelf () {
		this.container.entries.registerFor(this.Type, this);
		return this;
	}
}