module.exports = class_create({
	constructor () {
		this.arr = [];
		this.ids = {};
		this.types = {};
	},

	add (entry) {
		this.arr.push(entry);
	},

	resolve (mix) {
		var entry = null;
		if (typeof mix === 'string') {
			entry = this.ids[entry];
		}
		if (typeof mix === 'function') {
			entry = this.getForType(mix);
		}
		if (entry == null) {
			throw Error(`Entry for Type '${mix.name}' not found`)
		}	
		return entry.resolve();
	},

	getByType (Type) {
		var arr = this.arr,
			imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type)
				return x;
		}
		return null;
	},

	getFor (mix, required = false) {
		if (typeof mix === 'string') {
			var entry = this.ids[mix];
			if (required === true && entry == null) {
				throw Error(`Dependency is not registered "${mix}"`);
			}
			return entry;
		}
		if (typeof mix === 'function') {
			var entry = this.getForType(mix);
			if (required === true && entry == null) {
				throw Error(`Dependency is not registered "${mix.name}"`);
			}
			return entry;
		}
		throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
	},

	getForType (Type) {
		var name = Type.name,			
			arr = this.types[name];
		if (arr == null) {
			return null;
		}
		var imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type)
				return x.entry;
		}
		return null;
	},

	removeForType(Type) {
		var arr = this.types,
			imax = arr.length,
			i = -1;
		while(++i < imax) {
			var x = arr[i];
			if (x.Type === Type) {
				arr.splice(i, 1);
				return;
			}
		}
		return;
	},

	removeFor (mix) {
		if (typeof mix === 'string') {
			this.ids[mix] = null;
			return;
		}
		if (typeof mix === 'function') {
			var name = mix.name;
			var arr = this.types[name];
			if (arr == null) {
				return;
			}
			var i = arr.length;
			while(--i !== -1) {
				if (arr[i].Type === mix) {
					arr.splice(i, 1);
				}
			}
			return;
		}
	},

	registerFor (mix, entry) {
		if (typeof mix === 'string') {
			this.ids[mix] = entry;
			return;
		}
		if (typeof mix === 'function') {
			var name = mix.name;
			var arr = this.types[name];
			if (arr == null) {
				arr = this.types[name] = [];
			}
			arr.push({
				Type: mix,
				entry: entry
			});
			return;
		}
		throw Error('Collection::registerFor. Unsupported value type: ' + (typeof mix));
	}

});