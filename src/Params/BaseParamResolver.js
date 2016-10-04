module.exports = class_create({
	
	constructor (di, mix) {
		this.entry = di.entries.getFor(mix, true);
	},

	resolve (currentParam) {
		if (currentParam != null) {
			return currentParam;
		}
		return this.entry.resolve();
	}
});