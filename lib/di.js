
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
					
				// source ./templates/RootModule.js
				(function(){
					
					
				// source ./templates/Header.js
				var __register, __require, require;
				
				(function(){
				
					// source ./path.js
					var path_getDir,
						path_resolveCurrent,
						path_normalize,
						path_resolveUrl,
						path_combine	
						;
					(function(){
						var isNodeJS = typeof process !== 'undefined' 
							&& typeof window === 'undefined' 
							&& typeof navigator === 'undefined';
					
						path_getDir = function(path) {
							return path.substring(0, path.lastIndexOf('/') + 1);
						};
					
						(function(){
							var current_;		
							if (isNodeJS === false) {
								path_resolveCurrent = function(){
									if (current_ != null) return current_;
					
									var fn = 'baseURI' in global.document
											? fromBase
											: fromLocation;
									return (current_ = path_sliceFilename(fn()));
								};
								function fromBase() {
									var path = global.document.baseURI;
									var i = path.indexOf('?');
									return i === -1 ? path : path.substring(0, i);
								}
								function fromLocation() {
									return global.location.origin + global.location.pathname;
								}
							}
							else {
							
								path_resolveCurrent = function(){
									if (current_ != null) return current_;
									return (current_ = path_win32Normalize(__dirname));
								};
							}
						}());
					
					
						path_normalize = function(path) {
							var path_ = path
								.replace(new RegExp("\\\\", "g"), '/')
								// remove double slashes, but not near protocol
								.replace(new RegExp("([^:\\/])\\/{2,}", "g"), '$1/')
								// './xx' to relative string
								.replace(new RegExp("^\\.\\/"), '')
								// join 'xx/./xx'
								.replace(new RegExp("\\/\\.\\//", "g"), '/')
								;
							path_ = path_collapse(path_);		
							return path_;
						};
						path_resolveUrl = function(path, location) {
							if (/\.\w+$/.test(path) === false) {
								path += '.js';
							}
							var url = path_normalize(path);
							if (url[0] === '/') {
								url = path_combine(path_resolveCurrent(), url);
							} else if (rgx_PROTOCOL.test(url) === false) {
								url = path_normalize(path_combine(location || path_resolveCurrent(), url));
							}
							if (rgx_PROTOCOL.test(url) === false) {
								url = 'file://' + url;
							}
							return url;
						};
						
						path_combine = function() {
							var out = '',
								imax = arguments.length,
								i = -1, x;
							while ( ++i < imax ){
								x = arguments[i];
								if (!x)  continue;
					
								x = path_normalize(x);
								if (out === '') {
									out = x;
									continue;
								}
								if (out[out.length - 1] !== '/') {
									out += '/'
								}
								if (x[0] === '/') {
									x = x.substring(1);
								}
								out += x;
							}
							return path_collapse(out);
						};
					
						var rgx_PROTOCOL = /^(file|https?):/i,
							rgx_SUB_DIR  = new RegExp("[^\\/\\.]+/\\.\\.\\/"),
							rgx_FILENAME = new RegExp("\\/[^\\/]+\\.\\w+(\\?.*)?(#.*)?$"),
							rgx_EXT      = new RegExp("\\.(\\w+)$"),
							rgx_win32Drive = new RegExp("(^\\/?\\w{1}:)(\\/|$)")
							;
					
						function path_win32Normalize (path){
							path = path_normalize(path);
							if (path.substring(0, 5) === 'file:')
								return path;
					
							return 'file://' + path;
						}
					
						function path_collapse(url_) {
							var url = url_;
							while (rgx_SUB_DIR.test(url)) {
								url = url.replace(rgx_SUB_DIR, '');
							}
							return url;
						}
						function path_ensureTrailingSlash(path) {
							if (path.charCodeAt(path.length - 1) === 47 /* / */)
								return path;
					
							return path + '/';
						}
						function path_sliceFilename(path) {
							return path_ensureTrailingSlash(path.replace(rgx_FILENAME, ''));
						}
					
					}());
					
					// end:source ./path.js
				
					var __global = typeof global !== 'undefined' && global ? global : window;
					var __nativeRequire = __global.require;
					var __originalRequire = function (path_) {
						var location = this.location;
						var path = path_resolveUrl(path_, location);
				
						if (modules[path]) {
							return modules[path].runOnce();
						}
				
						return __nativeRequire(path_);
					};
				
					__register = function (path, factory) {
						var filename = path_resolveUrl(path);	
						modules[filename] = new Module(filename, factory);			
					};
				
					__require =__originalRequire.bind({ location: path_getDir(path_resolveUrl('/src/Di.js')) });
				
					var modules = {};
					var Module = function(filename, factory){	
						this.filename = filename;
						this.dirname = path_getDir(filename);
						this.factory = factory;
						this.exports = null;
					};
					Module.prototype.runOnce = function(){
						if (this.exports != null) {
							return this.exports;
						}
						var require = __originalRequire.bind({ 
							location: this.dirname 
						});
						this.exports = {};
						this.factory(
							require, 
							this, 
							this.exports, 
							this.filename, 
							this.dirname
						);
						return this.exports;
					};
					
					require = __require;
				
					if (__nativeRequire == null) {
						global.require = __require;
					}
				}());
				// end:source ./templates/Header.js
				
				// source ./templates/Module.js
				__register("/src/Params/BaseParamResolver.js", function(require, module, exports, __filename, __dirname){
					"use strict";

module.exports = class_create({

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
//# sourceMappingURL=BaseParamResolver.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Params/ObjectParamResolver.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var BaseParamResolver = require("./BaseParamResolver");

module.exports = class_create({

	constructor: function constructor(di, object) {
		this.object = object;
		this.entries = di.entries;
	},

	resolve: function resolve(currentParam) {
		if (currentParam !== null && is_Object(currentParam) === false) {
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
//# sourceMappingURL=ObjectParamResolver.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Params/EmptyParamResolver.js", function(require, module, exports, __filename, __dirname){
					"use strict";

module.exports = class_create({
	resolve: function resolve(current) {
		return current;
	}
});
//# sourceMappingURL=EmptyParamResolver.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Params/ParamResolver.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var BaseParamResolver = require("./BaseParamResolver"),
    ObjectParamResolver = require("./ObjectParamResolver"),
    EmptyParamResolver = require("./EmptyParamResolver");

module.exports = {

	create: function create(di, mix) {
		if (mix == null) {
			return new EmptyParamResolver();
		}
		if (is_Object(mix)) {
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
//# sourceMappingURL=ParamResolver.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/const.js", function(require, module, exports, __filename, __dirname){
					"use strict";

module.exports = {
	/**
  * How to handle the arguments passed to the wrapped function
  */
	args: {
		OVERRIDE: "override",
		IGNORE: "ignore",
		EXTEND: "extend"
	}
};
//# sourceMappingURL=const.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/Entry.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var ParamResolver = require("../Params/ParamResolver");
var opts = require("../const");

module.exports = class_create(Object.defineProperties({

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
		var args = _Array_slice.call(arguments);
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
		var args = _Array_slice.call(arguments);
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
		coll.removeFor(this.Entry);
		coll.add(this);
		return this;
	},

	asSelf: function asSelf() {
		this.di.entries.registerFor(this.Entry, this);
		return this;
	},

	resolve: function resolve() {
		throw new Error("Not implemented");
	},

	onActivated: function onActivated(fn) {
		this.onActivated = fn;
	} }, {
	Entry: {
		get: function () {
			throw new Error("Not implemented");
		},
		configurable: true,
		enumerable: true
	}
}));
//# sourceMappingURL=Entry.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/ObjectEntry.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var Entry = require("./Entry");
var ParamResolver = require("../Params/ParamResolver");

module.exports = class_create(Entry, {

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
	}

});
//# sourceMappingURL=ObjectEntry.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/BaseMethodEntry.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var Entry = require("./Entry");
var opts = require("../const");

module.exports = class_create(Entry, {

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
		this._params = _Array_slice.call(arguments);
		return this;
	},

	getParams_: function getParams_() {
		var args = _Array_slice.call(arguments),
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

		var Fn = this.Entry,
		    expect = Fn.length;
		if (expect > size) {
			throw new Error("Not enough arguments for Method " + Fn.name + ". Have " + size + ". Expect " + expect);
		}

		return ctorParams;
	}
});
//# sourceMappingURL=BaseMethodEntry.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/TypeEntry.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var BaseMethodEntry = require("./BaseMethodEntry");
var opts = require("../const");

module.exports = class_create(BaseMethodEntry, Object.defineProperties({

	constructor: function constructor(di, Type) {
		this.Type = Type;
	},

	resolve: function resolve() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var args = _Array_slice.call(arguments),
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
}, {
	Entry: {
		get: function () {
			return this.Type;
		},
		configurable: true,
		enumerable: true
	}
}));
//# sourceMappingURL=TypeEntry.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/FnEntry.js", function(require, module, exports, __filename, __dirname){
					"use strict";

var BaseMethodEntry = require("./BaseMethodEntry");
var ParamResolver = require("../Params/ParamResolver");

module.exports = class_create(BaseMethodEntry, Object.defineProperties({
	constructor: function constructor(container, fn) {
		this.Fn = fn;
	},

	resolve: function resolve() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var args = _Array_slice.call(arguments),
		    params = this.getParams_.apply(this, args);
		return this.Fn.apply(null, params);
	},

	wrap: function wrap() {
		return this.resolve.bind(this);
	}
}, {
	Entry: {
		get: function () {
			return this.Fn;
		},
		configurable: true,
		enumerable: true
	}
}));
//# sourceMappingURL=FnEntry.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/MetaReader.js", function(require, module, exports, __filename, __dirname){
					"use strict";

module.exports = class_create({
	readFromType: function readFromType(Type) {
		return Type.$constructor;
	}
});
//# sourceMappingURL=MetaReader.js.map
				});
				// end:source ./templates/Module.js
				

				// source ./templates/Module.js
				__register("/src/Entries/EntryCollection.js", function(require, module, exports, __filename, __dirname){
					"use strict";

module.exports = class_create({
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
//# sourceMappingURL=EntryCollection.js.map
				});
				// end:source ./templates/Module.js
				
// source utils/
// source is.js
"use strict";

var is_Object;
(function () {
	is_Object = function (mix) {
		return mix != null && typeof mix === "object" && mix.toString() === "[object Object]";
	};
})();
//# sourceMappingURL=is.js.map
// end:source is.js
// source obj.js
"use strict";

var obj_extend, obj_extendDefaults, obj_create;
(function () {
	obj_extend = function (a, b) {
		if (b == null) return a || {};

		if (a == null) return obj_create(b);

		for (var key in b) {
			a[key] = b[key];
		}
		return a;
	};
	obj_extendDefaults = function (a, b) {
		if (b == null) return a || {};
		if (a == null) return obj_create(b);

		for (var key in b) {
			if (a[key] == null) {
				a[key] = b[key];
				continue;
			}
			if (key === "toString" && a[key] === Object.prototype.toString) {
				a[key] = b[key];
			}
		}
		return a;
	};
	_Object_create = obj_create = Object.create || function (x) {
		var Ctor = function Ctor() {};
		Ctor.prototype = x;
		return new Ctor();
	};
})();
//# sourceMappingURL=obj.js.map
// end:source obj.js
// source refs.js
"use strict";

var _Array_slice = Array.prototype.slice;
//# sourceMappingURL=refs.js.map
// end:source refs.js
// source class.js
"use strict";

var class_create;
(function () {

	class_create = createClassFactory(obj_extendDefaults);

	function createClassFactory(extendDefaultsFn) {
		return function () {
			var args = _Array_slice.call(arguments),
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
			var args = _Array_slice.call(arguments);
			var x = fnA.apply(this, args);
			if (x !== void 0) return x;

			return fnB.apply(this, args);
		};
	}
})();
//# sourceMappingURL=class.js.map
// end:source class.js
//# sourceMappingURL=exports.js.map
// end:source utils/

var ObjectEntry = require("./Entries/ObjectEntry");
var TypeEntry = require("./Entries/TypeEntry");
var FnEntry = require("./Entries/FnEntry");

var MetaReader = require("./Entries/MetaReader");
var EntryCollection = require("./Entries/EntryCollection");

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
				
				}());
				// end:source ./templates/RootModule.js
				
				}));
				// end:source ./templates/UMD.js
				