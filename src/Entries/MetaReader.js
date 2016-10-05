var { create: class_create } = require('../utils/class');

module.exports = class_create({
	readFromType (Type) {
		return Type.$constructor;
	}
});