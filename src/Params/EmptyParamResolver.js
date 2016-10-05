var { create: class_create } = require('../utils/class');

module.exports = class_create({
	resolve(current) {
		return current;
	}
});