
				// source ./templates/UMD.js
				(function(factory){
					
					var _name = 'Di',
						_global = typeof window === 'undefined' ? global : window,
						_module = {
							exports: {}
						};
				
					factory(_module, _global);
				
					if (typeof define === 'function' && define.amd) {
				        define([], function () {
				        	return _module.exports;
				        });
				        return;
				    } 
				    if (typeof module === 'object' && module.exports) {
				    	module.exports = _module.exports;
				    	return;
				    }
				
				    _global[_name] = _module.exports;
				
				}(function(module, global){
					
				// source ./templates/ModuleSimplified.js
				var _src_utils_obj;
				(function () {
					"use strict";

_src_utils_obj = {
	extend: function extend(a, b) {
		if (b == null) {
			return a || {};
		}if (a == null) {
			return obj_create(b);
		}for (var key in b) {
			a[key] = b[key];
		}
		return a;
	},
	extendDefaults: function extendDefaults(a, b) {
		if (b == null) {
			return a || {};
		}if (a == null) {
			return obj_create(b);
		}for (var key in b) {
			if (a[key] == null) {
				a[key] = b[key];
				continue;
			}
			if (key === "toString" && a[key] === Object.prototype.toString) {
				a[key] = b[key];
			}
		}
		return a;
	}
};

var obj_create;
(function () {
	obj_create = Object.create || function (x) {
		var Ctor = function Ctor() {};
		Ctor.prototype = x;
		return new Ctor();
	};
})();
//# sourceMappingURL=obj.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_arr;
				(function () {
					"use strict";

_src_utils_arr = {
	from: function from(arr) {
		return Array.prototype.slice.call(arr);
	}
};
//# sourceMappingURL=arr.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_class;
				(function () {
					"use strict";

var obj = _src_utils_obj;
var Arr = _src_utils_arr;

_src_utils_class = {
	create: createClassFactory(obj.extendDefaults)
};

function createClassFactory(extendDefaultsFn) {
	return function () {
		var args = Arr.from(arguments),
		    Proto = args.pop();
		if (Proto == null) Proto = {};

		var Ctor;

		if (Proto.hasOwnProperty("constructor")) {
			Ctor = Proto.constructor;
			if (Ctor.prototype === void 0) {
				var es6Method = Ctor;
				Ctor = function ClassCtor() {
					var imax = arguments.length,
					    i = -1,
					    args = new Array(imax);
					while (++i < imax) args[i] = arguments[i];
					return es6Method.apply(this, args);
				};
			}
		} else {
			Ctor = function ClassCtor() {};
		}

		var i = args.length,
		    BaseCtor,
		    x;
		while (--i > -1) {
			x = args[i];
			if (typeof x === "function") {
				BaseCtor = wrapFn(x, BaseCtor);
				x = x.prototype;
			}
			extendDefaultsFn(Proto, x);
		}
		return createClass(wrapFn(BaseCtor, Ctor), Proto);
	};
}

function createClass(Ctor, Proto) {
	Proto.constructor = Ctor;
	Ctor.prototype = Proto;
	return Ctor;
}
function wrapFn(fnA, fnB) {
	if (fnA == null) {
		return fnB;
	}
	if (fnB == null) {
		return fnA;
	}
	return function () {
		var args = Arr.from(arguments);
		var x = fnA.apply(this, args);
		if (x !== void 0) return x;

		return fnB.apply(this, args);
	};
}
//# sourceMappingURL=class.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Params_BaseParamResolver;
				(function () {
					"use strict";

var _require = _src_utils_class;

var class_create = _require.create;

_src_Params_BaseParamResolver = class_create({

	constructor: function constructor(di, mix) {
		this.entry = di.entries.getFor(mix, true);
	},

	resolve: function resolve(currentParam) {
		if (currentParam != null) {
			return currentParam;
		}
		return this.entry.resolve();
	}
});
//# sourceMappingURL=BaseParamResolver.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils_is;
				(function () {
					"use strict";

_src_utils_is = {
	Object: function Object(mix) {
		return mix != null && typeof mix === "object" && mix.toString() === "[object Object]";
	}
};
//# sourceMappingURL=is.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Params_ObjectParamResolver;
				(function () {
					"use strict";

var BaseParamResolver = _src_Params_BaseParamResolver;
var is = _src_utils_is;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Params_ObjectParamResolver = class_create({

	constructor: function constructor(di, object) {
		this.object = object;
		this.entries = di.entries;
	},

	resolve: function resolve(currentParam) {
		if (currentParam !== null && is.Object(currentParam) === false) {
			throw new Error("Object is expected to extend the resultig one");
		}

		var out = Object.create(this.object);
		for (var key in out) {
			out[key] = this.entries.resolve(out[key]);
		}
		for (var key in currentParam) {
			out[key] = currentParam[key];
		}
		return out;
	}
});
//# sourceMappingURL=ObjectParamResolver.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Params_EmptyParamResolver;
				(function () {
					"use strict";

var _require = _src_utils_class;

var class_create = _require.create;

_src_Params_EmptyParamResolver = class_create({
	resolve: function resolve(current) {
		return current;
	}
});
//# sourceMappingURL=EmptyParamResolver.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Params_ParamResolver;
				(function () {
					"use strict";

var BaseParamResolver = _src_Params_BaseParamResolver,
    ObjectParamResolver = _src_Params_ObjectParamResolver,
    EmptyParamResolver = _src_Params_EmptyParamResolver,
    is = _src_utils_is;

_src_Params_ParamResolver = {

	create: function create(di, mix) {
		if (mix == null) {
			return new EmptyParamResolver();
		}
		if (is.Object(mix)) {
			return new ObjectParamResolver(di, mix);
		}
		return new BaseParamResolver(di, mix);
	},

	createMany: function createMany(di, arr) {
		var out = new Array(arr.length),
		    i = arr.length;
		while (--i !== -1) {
			out[i] = ParamResolver.create(di, arr[i]);
		}
		return out;
	}
};
//# sourceMappingURL=ParamResolver.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_const;
				(function () {
					"use strict";

_src_const = {
	/**
  * How to handle the arguments passed to the wrapped function
  */
	args: {
		OVERRIDE: "override",
		IGNORE: "ignore",
		EXTEND: "extend"
	}
};
//# sourceMappingURL=const.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_Entry;
				(function () {
					"use strict";

var ParamResolver = _src_Params_ParamResolver;
var opts = _src_const;
var Arr = _src_utils_arr;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_Entry = class_create({

	constructor: function constructor(di) {
		this.di = di;

		this._as = [];
		this._using = [];
		this._params = [];
		this._resolvers = [];

		this.cfg_arguments = opts.args.OVERRIDE;

		this.onActivated = null;
	},

	config: function config(key, value) {
		var prop = "cfg_" + key;
		if (this[prop] === void 0) {
			throw new Error("Configuration key is not supported: " + key);
		}
		this[prop] = value;
		return this;
	},

	using: function using() {
		var args = Arr.from(arguments);
		this._using.push.apply(this._using, args);

		var resolvers = new Array(args.length),
		    imax = args.length,
		    i = -1;
		while (++i < imax) {
			resolvers[i] = ParamResolver.create(this.di, args[i]);
		}

		this._resolvers.push.apply(this._resolvers, resolvers);
		return this;
	},

	as: function as() {
		var args = Arr.from(arguments);
		this._as.push.apply(this._as, args);

		var i = args.length,
		    entries = this.di.entries;
		while (--i > -1) {
			entries.registerFor(args[i], this);
		}
		return this;
	},

	register: function register() {
		var coll = this.di.entries;
		coll.removeFor(this.Entry());
		coll.add(this);
		return this;
	},

	asSelf: function asSelf() {
		this.di.entries.registerFor(this.Entry(), this);
		return this;
	},

	resolve: function resolve() {
		throw new Error("Not implemented");
	},

	onActivated: function onActivated(fn) {
		this.onActivated = fn;
	},

	Entry: function Entry() {
		throw new Error("Not implemented");
	}
});
//# sourceMappingURL=Entry.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_ObjectEntry;
				(function () {
					"use strict";

var Entry = _src_Entries_Entry;
var ParamResolver = _src_Params_ParamResolver;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_ObjectEntry = class_create(Entry, {

	constructor: function constructor(container, object) {
		this.Object = object;
	},

	using: function using(objectDefinitions) {
		if (arguments.length !== 1) {
			throw new Error("Invalid argument count in using for an ObjectEntry");
		}
		for (var key in objectDefinitions) {
			var paramResolver = ParamResolver.create(container, objectDefinitions[key]);
			this.resolvers.push([key, paramResolver]);
		}
	},

	resolve: function resolve(currentObject) {
		var object = Object.create(this.Object);
		var arr = this.resolvers,
		    i = arr.length;
		while (--i > -1) {
			var resolverEntry = this.resolvers[i];
			var key = resolverEntry[0],
			    Resolver = resolverEntry[1];

			var arg = currentObject == null ? null : currentObject[key];
			var val = Resolver.resolve(arg);

			object[key] = val;
		}
		for (var key in currentObject) {
			if (object[key] == null) {
				object[key] = currentObject[key];
			}
		}
		return object;
	},

	wrap: function wrap() {
		return this.resolve.bind(this);
	},

	Entry: function Entry() {
		return this.Object;
	}

});
//# sourceMappingURL=ObjectEntry.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_BaseMethodEntry;
				(function () {
					"use strict";

var Entry = _src_Entries_Entry;
var opts = _src_const;
var Arr = _src_utils_arr;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_BaseMethodEntry = class_create(Entry, {

	constructor: function constructor(di, Entry) {
		if (typeof Entry !== "function") {
			throw new Error("Invalid argument. Function expected");
		}

		var using = di.metaReader.readFromType(Entry);
		if (using != null) {
			this.using.apply(this, using);
		}
	},

	withParams: function withParams() {
		this._params = Arr.from(arguments);
		return this;
	},

	getParams_: function getParams_() {
		var args = Arr.from(arguments),
		    resolvers = this._resolvers,
		    params = this._params;

		var argsIgnore = this.cfg_arguments === opts.args.IGNORE,
		    argsExtend = this.cfg_arguments === opts.args.EXTEND,
		    argsOverride = this.cfg_arguments === opts.args.OVERRIDE;

		var size = resolvers.length;
		if (size < params.length) size = params.length;
		if (argsIgnore === false) {
			if (argsExtend) {
				size += args.length;
			}
			if (argsOverride && args.length > size) {
				size = args.length;
			}
		}

		var ctorParams = new Array(size);
		var i = -1;
		while (++i < size) {

			if (i < params.length && params[i] != null) {
				var arg = argsIgnore === false && i < args.length && args[i] != null ? args[i] : params[i];
				ctorParams[i] = arg;
				continue;
			}
			if (i < resolvers.length && resolvers[i] != null) {
				var arg = argsIgnore === false && i < args.length ? args[i] : void 0;
				ctorParams[i] = resolvers[i].resolve(arg);
				continue;
			}
			if (argsIgnore) {
				continue;
			}
			if (argsOverride && i < args.length) {
				ctorParams[i] = args[i];
				continue;
			}
			if (argsExtend && i >= size - args.length) {
				var j = i - size - args.length;
				ctorParams[i] = args[j];
				continue;
			}
		}

		var Fn = this.Entry(),
		    expect = Fn.length;
		if (expect > size) {
			throw new Error("Not enough arguments for Method " + Fn.name + ". Have " + size + ". Expect " + expect);
		}

		return ctorParams;
	}
});
//# sourceMappingURL=BaseMethodEntry.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_TypeEntry;
				(function () {
					"use strict";

var BaseMethodEntry = _src_Entries_BaseMethodEntry;
var opts = _src_const;
var Arr = _src_utils_arr;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_TypeEntry = class_create(BaseMethodEntry, {

	constructor: function constructor(di, Type) {
		this.Type = Type;
	},

	Entry: function Entry() {
		return this.Type;
	},

	resolve: function resolve() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var args = Arr.from(arguments),
		    params = this.getParams_.apply(this, args),
		    Ctor = this.Type;
		return new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
	},

	wrap: function wrap() {
		var self = this;
		return function () {
			return self.resolve.apply(this, arguments);
		};
	}
});
//# sourceMappingURL=TypeEntry.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_FnEntry;
				(function () {
					"use strict";

var BaseMethodEntry = _src_Entries_BaseMethodEntry;
var ParamResolver = _src_Params_ParamResolver;
var Arr = _src_utils_arr;

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_FnEntry = class_create(BaseMethodEntry, {
	constructor: function constructor(container, fn) {
		this.Fn = fn;
	},

	Entry: function Entry() {
		return this.Fn;
	},

	resolve: function resolve() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var args = Arr.from(arguments),
		    params = this.getParams_.apply(this, args);
		return this.Fn.apply(null, params);
	},

	wrap: function wrap() {
		return this.resolve.bind(this);
	}
});
//# sourceMappingURL=FnEntry.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_MetaReader;
				(function () {
					"use strict";

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_MetaReader = class_create({
	readFromType: function readFromType(Type) {
		return Type.$constructor;
	}
});
//# sourceMappingURL=MetaReader.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_Entries_EntryCollection;
				(function () {
					"use strict";

var _require = _src_utils_class;

var class_create = _require.create;

_src_Entries_EntryCollection = class_create({
	constructor: function constructor() {
		this.arr = [];
		this.ids = {};
		this.types = {};
	},

	add: function add(entry) {
		this.arr.push(entry);
	},

	resolve: function resolve(mix) {
		var entry = null;
		if (typeof mix === "string") {
			entry = this.ids[entry];
		}
		if (typeof mix === "function") {
			entry = this.getForType(mix);
		}
		if (entry == null) {
			throw Error("Entry for Type '" + mix.name + "' not found");
		}
		return entry.resolve();
	},

	getByType: function getByType(Type) {
		var arr = this.arr,
		    imax = arr.length,
		    i = -1;
		while (++i < imax) {
			var x = arr[i];
			if (x.Type === Type) {
				return x;
			}
		}
		return null;
	},

	getFor: function getFor(mix) {
		var required = arguments[1] === undefined ? false : arguments[1];

		if (typeof mix === "string") {
			var entry = this.ids[mix];
			if (required === true && entry == null) {
				throw Error("Dependency is not registered \"" + mix + "\"");
			}
			return entry;
		}
		if (typeof mix === "function") {
			var entry = this.getForType(mix);
			if (required === true && entry == null) {
				throw Error("Dependency is not registered \"" + mix.name + "\"");
			}
			return entry;
		}
		throw new Error("Collection::getFor. Unsupported value type: " + typeof mix);
	},

	getForType: function getForType(Type) {
		var name = Type.name,
		    arr = this.types[name];
		if (arr == null) {
			return null;
		}
		var imax = arr.length,
		    i = -1;
		while (++i < imax) {
			var x = arr[i];
			if (x.Type === Type) {
				return x.entry;
			}
		}
		return null;
	},

	removeForType: function removeForType(Type) {
		var arr = this.types,
		    imax = arr.length,
		    i = -1;
		while (++i < imax) {
			var x = arr[i];
			if (x.Type === Type) {
				arr.splice(i, 1);
				return;
			}
		}
		return;
	},

	removeFor: function removeFor(mix) {
		if (typeof mix === "string") {
			this.ids[mix] = null;
			return;
		}
		if (typeof mix === "function") {
			var name = mix.name;
			var arr = this.types[name];
			if (arr == null) {
				return;
			}
			var i = arr.length;
			while (--i !== -1) {
				if (arr[i].Type === mix) {
					arr.splice(i, 1);
				}
			}
			return;
		}
	},

	registerFor: function registerFor(mix, entry) {
		if (typeof mix === "string") {
			this.ids[mix] = entry;
			return;
		}
		if (typeof mix === "function") {
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
		throw Error("Collection::registerFor. Unsupported value type: " + typeof mix);
	}

});
//# sourceMappingURL=EntryCollection.js.map;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";

var ObjectEntry = _src_Entries_ObjectEntry;
var TypeEntry = _src_Entries_TypeEntry;
var FnEntry = _src_Entries_FnEntry;
var MetaReader = _src_Entries_MetaReader;
var EntryCollection = _src_Entries_EntryCollection;

var _require = _src_utils_class;

var class_create = _require.create;

module.exports = class_create({
	constructor: function constructor() {
		var container = arguments[0] === undefined ? null : arguments[0];

		this.childContainer = container;
		this.entries = new EntryCollection();
		this.metaReader = new MetaReader();
	},

	registerType: function registerType(Type) {
		return this.Type(Type).register();
	},

	registerFactory: function registerFactory(Fn) {
		return this.Function(Fn).register();
	},

	Type: (function (_Type) {
		var _TypeWrapper = function Type(_x) {
			return _Type.apply(this, arguments);
		};

		_TypeWrapper.toString = function () {
			return _Type.toString();
		};

		return _TypeWrapper;
	})(function (Type) {
		return new TypeEntry(this, Type);
	}),

	Function: function Function(fn) {
		return new FnEntry(this, fn);
	},

	Object: function Object(object) {
		return new ObjectEntry(this, object);
	},

	resolve: function resolve(mix) {
		return this.entries.resolve(mix);
	},

	wrapType: function wrapType(Type) {
		return this.entries.getFor(Type).wrap();
	}
});
//# sourceMappingURL=Di.js.map
				}));
				// end:source ./templates/UMD.js
				