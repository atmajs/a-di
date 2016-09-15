var is = require('./utils/is');

module.exports = class PropertyResolver {
	constructor (object, entries) {
		this.object = object;
		this.entries = entries;
		this.resolver = this.resolve.bind(this);
	}

	resolve (mix) {
		if (mix !== null && is.Object(mix) === false) {
			throw new Error('Object is expected to extend the resultig one')
		}

		var out = Object.create(this.object);
		for(var key in out) {
			out[key] = this.entries.resolve(out[key]);
		}
		for (var key in mix) {
			out[key] = mix[key];
		}
		logger.log('MIX'.red.bold, mix, out);
		return out;
	}
}