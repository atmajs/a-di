// import utils/

var ObjectEntry = require('./Entries/ObjectEntry');
var TypeEntry = require('./Entries/TypeEntry');
var FnEntry = require('./Entries/FnEntry');

var MetaReader = require('./Entries/MetaReader');
var EntryCollection = require('./Entries/EntryCollection');

module.exports = class_create({
	constructor (container = null) {
		this.childContainer = container;
		this.entries = new EntryCollection();
		this.metaReader = new MetaReader();	
	},

	registerType (Type) {
		return this.Type(Type).register();
	},
	
	registerFactory (Fn) {
		return this.Function(Fn).register();
	},

	Type (Type) {
		return new TypeEntry(this, Type);
	},

	Function (fn) {
		return new FnEntry(this, fn);
	},

	Object (object) {
		return new ObjectEntry(this, object);
	},

	resolve (mix) {
		return this.entries.resolve(mix);
	},

	wrapType (Type) {
		return this.entries.getFor(Type).wrap();
	}	
});