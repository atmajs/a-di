
export class MetaReader {
	readFromType (Type) {
		return Type.$constructor;
	}
};