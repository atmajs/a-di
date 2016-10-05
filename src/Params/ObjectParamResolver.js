var BaseParamResolver = require('./BaseParamResolver');
var { create: class_create } = require('../utils/class');

module.exports = class_create({
	
	constructor (di, object) {
		this.object = object;
		this.entries = di.entries;
	},

	resolve (currentParam) {
		if (currentParam !== null && is_Object(currentParam) === false) {
			throw new Error('Object is expected to extend the resultig one')
		}

		var out = Object.create(this.object);
		for(var key in out) {
			out[key] = this.entries.resolve(out[key]);
		}
		for (var key in currentParam) {
			out[key] = currentParam[key];
		}		
		return out;
	}
})