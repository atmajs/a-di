module.exports = class_create({
	readFromType (Type) {
		return Type.$constructor;
	}
});