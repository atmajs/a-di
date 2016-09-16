module.exports = class MetaReader {
	readFromType (Type) {
		return Type.$constructor;
	}
};