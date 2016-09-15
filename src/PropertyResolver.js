module.exports = class PropertyResolver {
	constructor (object, entries) {
		this.object = object;
		this.entries = entries;
		this.resolver = this.resolve.bind(this);
	}

	resolve () {
		logger.log('>>>'.red, arguments);

		var out = Object.create(this.object);
		for(var key in out) {
			out[key] = this.entries.resolve(out[key]);
		}
		return out;
	}
}