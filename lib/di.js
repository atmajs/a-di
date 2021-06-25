(function (root, factory) {
    'use strict';


    var _name = 'di',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_global, _module, _module.exports);

    if (_global[_name] == null) {
        _global[_name] = _module.exports;
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
        return;
    }
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
    }

}(this, function (global, module, exports) {
    'use strict';

    var _src_Di = {};
var _src_Entries_BaseMethodEntry = {};
var _src_Entries_Entry = {};
var _src_Entries_EntryCollection = {};
var _src_Entries_FnEntry = {};
var _src_Entries_MetaReader = {};
var _src_Entries_ObjectEntry = {};
var _src_Entries_TypeEntry = {};
var _src_Params_BaseParamResolver = {};
var _src_Params_EmptyParamResolver = {};
var _src_Params_ObjectParamResolver = {};
var _src_Params_ParamResolver = {};
var _src_TypeMeta = {};
var _src_const = {};
var _src_deco = {};
var _src_utils_is = {};

// source ./ModuleSimplified.js
var _src_const;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opts = {
    /**
     * How to handle the arguments passed to the wrapped function
     */
    args: {
        OVERRIDE: 'override',
        IGNORE: 'ignore',
        EXTEND: 'extend'
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_const) && isObject(module.exports)) {
		Object.assign(_src_const, module.exports);
		return;
	}
	_src_const = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Is = {
    Object: function (mix) {
        return mix != null
            && typeof mix === 'object'
            && mix.toString() === '[object Object]';
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_is) && isObject(module.exports)) {
		Object.assign(_src_utils_is, module.exports);
		return;
	}
	_src_utils_is = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_EmptyParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmptyParamResolver = /** @class */ (function () {
    function EmptyParamResolver() {
    }
    EmptyParamResolver.prototype.resolve = function (current) {
        return current;
    };
    return EmptyParamResolver;
}());
exports.EmptyParamResolver = EmptyParamResolver;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_EmptyParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_EmptyParamResolver, module.exports);
		return;
	}
	_src_Params_EmptyParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ObjectParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = _src_utils_is;
var ObjectParamResolver = /** @class */ (function () {
    function ObjectParamResolver(di, object) {
        this.object = object;
        this.entries = di.entries;
    }
    ObjectParamResolver.prototype.resolve = function (currentParam) {
        if (currentParam !== null && is_1.Is.Object(currentParam) === false) {
            throw new Error('Object is expected to extend the resultig one');
        }
        var out = Object.create(this.object);
        for (var key in out) {
            out[key] = this.entries.resolve(out[key]);
        }
        for (var key in currentParam) {
            out[key] = currentParam[key];
        }
        return out;
    };
    return ObjectParamResolver;
}());
exports.ObjectParamResolver = ObjectParamResolver;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_ObjectParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_ObjectParamResolver, module.exports);
		return;
	}
	_src_Params_ObjectParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_BaseParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseParamResolver = /** @class */ (function () {
    function BaseParamResolver(di, mix) {
        this.entry = di.entries.getFor(mix, true);
    }
    BaseParamResolver.prototype.resolve = function (currentParam) {
        if (currentParam != null) {
            return currentParam;
        }
        return this.entry.resolve();
    };
    return BaseParamResolver;
}());
exports.BaseParamResolver = BaseParamResolver;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_BaseParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_BaseParamResolver, module.exports);
		return;
	}
	_src_Params_BaseParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = _src_utils_is;
var EmptyParamResolver_1 = _src_Params_EmptyParamResolver;
var ObjectParamResolver_1 = _src_Params_ObjectParamResolver;
var BaseParamResolver_1 = _src_Params_BaseParamResolver;
exports.ParamResolver = {
    create: function (di, mix) {
        if (mix == null) {
            return new EmptyParamResolver_1.EmptyParamResolver();
        }
        if (is_1.Is.Object(mix)) {
            return new ObjectParamResolver_1.ObjectParamResolver(di, mix);
        }
        return new BaseParamResolver_1.BaseParamResolver(di, mix);
    },
    createMany: function (di, arr) {
        var out = new Array(arr.length), i = arr.length;
        while (--i !== -1) {
            out[i] = exports.ParamResolver.create(di, arr[i]);
        }
        return out;
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_ParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_ParamResolver, module.exports);
		return;
	}
	_src_Params_ParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_Entry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = _src_const;
var ParamResolver_1 = _src_Params_ParamResolver;
var Entry = /** @class */ (function () {
    function Entry(di) {
        this.di = di;
        this._as = [];
        this._using = [];
        this._params = [];
        this._resolvers = [];
        this._meta = null;
        this.cfg_arguments = const_1.Opts.args.OVERRIDE;
        this.cfg_singleton = true;
        this.onActivatedCb = null;
    }
    Entry.prototype.config = function (key, value) {
        var prop = "cfg_" + key;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    };
    Entry.prototype.using = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._using).push.apply(_a, args);
        var resolvers = new Array(args.length), imax = args.length, i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver_1.ParamResolver.create(this.di, args[i]);
        }
        (_b = this._resolvers).push.apply(_b, resolvers);
        return this;
    };
    Entry.prototype.isSingleton = function (val) {
        if (val === void 0) { val = true; }
        this.cfg_singleton = val;
        return this;
    };
    Entry.prototype.as = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._as).push.apply(_a, args);
        var i = args.length, entries = this.di.entries;
        while (--i > -1) {
            entries.registerFor(args[i], this);
        }
        return this;
    };
    Entry.prototype.register = function () {
        var coll = this.di.entries;
        var Entry = this.Entry();
        coll.removeFor(Entry);
        coll.registerFor(Entry, this);
        coll.add(this);
        return this;
    };
    Entry.prototype.asSelf = function () {
        this.di.entries.registerFor(this.Entry(), this);
        return this;
    };
    Entry.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error('Not implemented');
    };
    Entry.prototype.onActivated = function (fn) {
        this.onActivatedCb = fn;
    };
    Entry.prototype.Entry = function () {
        throw new Error('Not implemented');
    };
    return Entry;
}());
exports.Entry = Entry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_Entry) && isObject(module.exports)) {
		Object.assign(_src_Entries_Entry, module.exports);
		return;
	}
	_src_Entries_Entry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_TypeMeta;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeMeta;
(function (TypeMeta) {
    var map = new Map();
    function defineParam(Ctor, opts, index) {
        var meta = ensureMeta(Ctor);
        meta.params[index] = opts;
    }
    TypeMeta.defineParam = defineParam;
    function pickMeta(Ctor) {
        return map.get(Ctor);
    }
    function ensureMeta(Ctor) {
        var current = map.get(Ctor);
        if (current == null) {
            current = { params: [] };
            map.set(Ctor, current);
        }
        return current;
    }
    function prepairMeta(Ctor) {
        var meta = ensureMeta(Ctor);
        meta.hasSingletonParams = meta.params.some(function (x) { var _a; return (_a = x) === null || _a === void 0 ? void 0 : _a.singleton; });
        return meta;
    }
    TypeMeta.prepairMeta = prepairMeta;
})(TypeMeta = exports.TypeMeta || (exports.TypeMeta = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_TypeMeta) && isObject(module.exports)) {
		Object.assign(_src_TypeMeta, module.exports);
		return;
	}
	_src_TypeMeta = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_BaseMethodEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entry_1 = _src_Entries_Entry;
var const_1 = _src_const;
var TypeMeta_1 = _src_TypeMeta;
var BaseMethodEntry = /** @class */ (function (_super) {
    __extends(BaseMethodEntry, _super);
    function BaseMethodEntry(di, Entry) {
        var _this = _super.call(this, di) || this;
        if (typeof Entry !== 'function') {
            throw new Error('Invalid argument. Function expected');
        }
        var using = di.metaReader.readFromType(Entry);
        if (using != null) {
            _this.using.apply(_this, using);
        }
        return _this;
    }
    BaseMethodEntry.prototype.withParams = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._params = args;
        return this;
    };
    BaseMethodEntry.prototype.getParams_ = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a, _b;
        var Entry = this.Entry();
        var resolvers = this._resolvers;
        var params = this._params;
        var meta = (_a = this._meta, (_a !== null && _a !== void 0 ? _a : (this._meta = TypeMeta_1.TypeMeta.prepairMeta(Entry))));
        var argsIgnore = this.cfg_arguments === const_1.Opts.args.IGNORE;
        var argsExtend = this.cfg_arguments === const_1.Opts.args.EXTEND;
        var argsOverride = this.cfg_arguments === const_1.Opts.args.OVERRIDE;
        var size = resolvers.length;
        if (size < params.length) {
            size = params.length;
        }
        if (size < Entry.length) {
            size = Entry.length;
        }
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
            var arg = null;
            if (i < params.length && params[i] != null) {
                arg = argsIgnore === false && i < args.length && args[i] != null
                    ? args[i]
                    : params[i];
            }
            if (arg == null && i < resolvers.length && resolvers[i] != null) {
                var currentArg = argsIgnore === false && i < args.length
                    ? args[i]
                    : void 0;
                arg = resolvers[i].resolve(currentArg);
            }
            if (arg == null && i < meta.params.length && meta.params[i] != null) {
                var paramMeta = meta.params[i];
                if ((_b = paramMeta) === null || _b === void 0 ? void 0 : _b.Type) {
                    arg = this.di.resolve(paramMeta.Type);
                }
            }
            if (arg != null) {
                ctorParams[i] = arg;
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
        return ctorParams;
    };
    return BaseMethodEntry;
}(Entry_1.Entry));
exports.BaseMethodEntry = BaseMethodEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_BaseMethodEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_BaseMethodEntry, module.exports);
		return;
	}
	_src_Entries_BaseMethodEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_TypeEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
var TypeMeta_1 = _src_TypeMeta;
var TypeEntry = /** @class */ (function (_super) {
    __extends(TypeEntry, _super);
    function TypeEntry(di, Type) {
        var _this = _super.call(this, di, Type) || this;
        _this._singleton = null;
        _this._singletons = new Map();
        _this._holder = new SingletonsHolder();
        _this.Type = Type;
        return _this;
    }
    TypeEntry.prototype.Entry = function () {
        return this.Type;
    };
    TypeEntry.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        var Ctor = this.Type;
        if (this._meta == null) {
            this._meta = TypeMeta_1.TypeMeta.prepairMeta(Ctor);
        }
        var params = this.getParams_.apply(this, args);
        var paramsKey = null;
        if (this.cfg_singleton === true) {
            if (this._meta.hasSingletonParams) {
                var singletonArgs = [];
                var paramsMeta = this._meta.params;
                for (var i = 0; i < paramsMeta.length && i < params.length; i++) {
                    if ((_a = paramsMeta[i]) === null || _a === void 0 ? void 0 : _a.singleton) {
                        singletonArgs.push(params[i]);
                    }
                }
                //-paramsKey = Args.getKey(singletonArgs);
                paramsKey = this._holder.createKey(singletonArgs);
            }
            else if (args.length > 0) {
                //-paramsKey = Args.getKey(args);
                paramsKey = this._holder.createKey(args);
            }
            // if (paramsKey) {
            //     if (this._singletons.has(paramsKey)) {
            //         return this._singletons.get(paramsKey);
            //     }
            // } else if (this._singleton) {
            //     return this._singleton;
            // }
            var singleton = this._holder.getByKey(paramsKey);
            if (singleton != null) {
                return singleton;
            }
        }
        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        var instance = new (Ctor.bind.apply(Ctor, __spreadArrays([void 0], params)))();
        if (this.cfg_singleton === true) {
            // if (paramsKey != null) {
            //     this._singletons.set(paramsKey, instance);
            // } else {
            //     this._singleton = instance;
            // }
            this._holder.saveByKey(paramsKey, instance);
        }
        return instance;
    };
    TypeEntry.prototype.wrap = function () {
        var self = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return self.resolve.apply(self, args);
        };
    };
    return TypeEntry;
}(BaseMethodEntry_1.BaseMethodEntry));
exports.TypeEntry = TypeEntry;
;
var Args;
(function (Args) {
    var WARN_KEY_LENGTH = 1024;
    var MAX_LEVEL = 2;
    function getKey(args, level) {
        if (level === void 0) { level = 0; }
        var key = '';
        for (var i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i], level);
        }
        if (key.length > WARN_KEY_LENGTH) {
            console.error("DI: Singleton by arguments has the keylength of " + key.length + "c. Consider to use lightweight objects. " + key);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc, level) {
        if (level === void 0) { level = 0; }
        if (misc == null || typeof misc === 'function') {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc, level);
        }
        if (level >= MAX_LEVEL) {
            return "l_" + level;
        }
        var str = '';
        for (var key in misc) {
            var val = misc[key];
            var partial = getKeySingle(val, level + 1);
            if (partial != null && partial !== '') {
                str += '.' + partial;
            }
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
var SingletonsHolder = /** @class */ (function () {
    function SingletonsHolder() {
        this.singletonsByKey = new Map();
        this.singletonsByComplex = [];
    }
    SingletonsHolder.prototype.saveByKey = function (key, val) {
        if (key == null) {
            this.singleton = val;
            return;
        }
        if (typeof key === 'string') {
            this.singletonsByKey.set(key, val);
            return;
        }
        this.singletonsByComplex.push([key, val]);
    };
    SingletonsHolder.prototype.getByKey = function (key) {
        if (key == null) {
            return this.singleton;
        }
        if (typeof key === 'string') {
            return this.singletonsByKey.get(key);
        }
        var arrSingles = this.singletonsByComplex;
        var keyArr = key;
        outer: for (var i = 0; i < arrSingles.length; i++) {
            var _a = arrSingles[i], checkKey = _a[0], val = _a[1];
            if (checkKey.length !== keyArr.length) {
                continue;
            }
            for (var j = 0; j < keyArr.length; j++) {
                if (keyArr[j] !== checkKey[j]) {
                    continue outer;
                }
            }
            return val;
        }
        return null;
    };
    SingletonsHolder.prototype.createKey = function (args) {
        var _a;
        if (args == null || args.length === 0) {
            return null;
        }
        var key;
        var arr;
        var isComplex = false;
        for (var i = 0; i < args.length; i++) {
            var val = (_a = args[i], (_a !== null && _a !== void 0 ? _a : ''));
            if (isComplex) {
                arr.push(val);
                continue;
            }
            if (val instanceof Date) {
                val = val.getTime();
            }
            if (typeof val === 'function') {
                continue;
            }
            if (typeof val !== 'object') {
                key = key == null ? String(val) : key + "." + val;
                continue;
            }
            if (Array.isArray(val) || val.constructor === Object || val.constructor == null) {
                // Simple object?
                var objectKey = ToKey.toKey(val);
                if (objectKey != null) {
                    key = key == null ? String(objectKey) : key + "." + objectKey;
                    continue;
                }
            }
            isComplex = true;
            arr = key == null ? [val] : [key, val];
        }
        return isComplex ? arr : key;
    };
    return SingletonsHolder;
}());
var ToKey;
(function (ToKey) {
    var MAX_DEEP = 3;
    var MAX_ARR_LENGTH = 50;
    function fromObject(obj, level) {
        if (level === void 0) { level = 0; }
        if (level > MAX_DEEP) {
            return null;
        }
        var key = '';
        for (var prop in obj) {
            var val = obj[prop];
            if (val == null || typeof val === 'function') {
                continue;
            }
            var nextKey = toKey(val, level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : key + "." + nextKey;
        }
        return key;
    }
    function fromArray(arr, level) {
        if (level === void 0) { level = 0; }
        var _a;
        if (level > MAX_DEEP || ((_a = arr) === null || _a === void 0 ? void 0 : _a.length) > MAX_ARR_LENGTH) {
            return null;
        }
        if (arr.length === 0) {
            return '';
        }
        var key = null;
        for (var i = 0; i < arr.length; i++) {
            var nextKey = toKey(arr[i], level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : key + "." + nextKey;
        }
        return key;
    }
    function toKey(mix, level) {
        if (level === void 0) { level = 0; }
        if (level > MAX_DEEP) {
            return null;
        }
        if (mix == null || typeof mix === 'function') {
            return '';
        }
        if (typeof mix !== 'object') {
            return String(mix);
        }
        if (mix instanceof Date) {
            return String(mix.getTime());
        }
        if (mix instanceof RegExp) {
            return mix.toString();
        }
        if (Array.isArray(mix)) {
            return fromArray(mix, level + 1);
        }
        return fromObject(mix, level + 1);
    }
    ToKey.toKey = toKey;
})(ToKey || (ToKey = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_TypeEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_TypeEntry, module.exports);
		return;
	}
	_src_Entries_TypeEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_EntryCollection;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeEntry_1 = _src_Entries_TypeEntry;
var EntryCollection = /** @class */ (function () {
    function EntryCollection(di) {
        this.di = di;
        this.arr = [];
        this.ids = {};
        this.types = {};
    }
    EntryCollection.prototype.add = function (entry) {
        this.arr.push(entry);
    };
    EntryCollection.prototype.resolve = function (mix) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (mix == null) {
            throw new Error('Resolve argument is undefined');
        }
        var entry = null;
        if (typeof mix === 'string') {
            entry = this.ids[mix];
            if (entry == null) {
                throw Error("Entry for Type '" + mix + "' not found");
            }
        }
        if (typeof mix === 'function') {
            entry = this.getForType(mix);
            if (entry == null) {
                entry = new TypeEntry_1.TypeEntry(this.di, mix);
                this.registerFor(mix, entry);
            }
        }
        return entry.resolve.apply(entry, args);
    };
    EntryCollection.prototype.getByType = function (Type) {
        var arr = this.arr;
        var i = arr.length;
        while (--i > -1) {
            var x = arr[i];
            if (x.Type === Type) {
                return x;
            }
        }
        return null;
    };
    EntryCollection.prototype.getFor = function (mix, required) {
        if (required === void 0) { required = false; }
        if (typeof mix === 'string') {
            var entry = this.ids[mix];
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix + "\"");
            }
            return entry;
        }
        if (typeof mix === 'function') {
            var entry = this.getForType(mix);
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix.name + "\"");
            }
            return entry;
        }
        throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
    };
    EntryCollection.prototype.getForType = function (Type) {
        var _a;
        var name = Type.name;
        var arr = this.types[name];
        if (arr != null) {
            var i = arr.length;
            while (--i > -1) {
                var x = arr[i];
                if (x.Type === Type) {
                    return x.entry;
                }
            }
        }
        return (_a = this.di.parent) === null || _a === void 0 ? void 0 : _a.entries.getForType(Type);
    };
    EntryCollection.prototype.removeForType = function (Type) {
        var arr = this.types[Type.name];
        if (arr == null) {
            return;
        }
        var imax = arr.length, i = -1;
        while (++i < imax) {
            var x = arr[i];
            if (x.Type === Type) {
                arr.splice(i, 1);
                return;
            }
        }
    };
    EntryCollection.prototype.removeFor = function (mix) {
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
            while (--i !== -1) {
                if (arr[i].Type === mix) {
                    arr.splice(i, 1);
                }
            }
            return;
        }
    };
    EntryCollection.prototype.removeAll = function () {
        this.types = {};
        this.arr = [];
    };
    EntryCollection.prototype.registerFor = function (mix, entry) {
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
    };
    return EntryCollection;
}());
exports.EntryCollection = EntryCollection;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_EntryCollection) && isObject(module.exports)) {
		Object.assign(_src_Entries_EntryCollection, module.exports);
		return;
	}
	_src_Entries_EntryCollection = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_MetaReader;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetaReader = /** @class */ (function () {
    function MetaReader() {
    }
    MetaReader.prototype.readFromType = function (Type) {
        return Type.$constructor;
    };
    return MetaReader;
}());
exports.MetaReader = MetaReader;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_MetaReader) && isObject(module.exports)) {
		Object.assign(_src_Entries_MetaReader, module.exports);
		return;
	}
	_src_Entries_MetaReader = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_FnEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
var FnEntry = /** @class */ (function (_super) {
    __extends(FnEntry, _super);
    function FnEntry(di, fn) {
        var _this = _super.call(this, di, fn) || this;
        _this.Fn = fn;
        return _this;
    }
    FnEntry.prototype.Entry = function () {
        return this.Fn;
    };
    FnEntry.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = this.getParams_.apply(this, args);
        return this.Fn.apply(null, params);
    };
    FnEntry.prototype.wrap = function () {
        return this.resolve.bind(this);
    };
    return FnEntry;
}(BaseMethodEntry_1.BaseMethodEntry));
exports.FnEntry = FnEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_FnEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_FnEntry, module.exports);
		return;
	}
	_src_Entries_FnEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_ObjectEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entry_1 = _src_Entries_Entry;
var ParamResolver_1 = _src_Params_ParamResolver;
var ObjectEntry = /** @class */ (function (_super) {
    __extends(ObjectEntry, _super);
    function ObjectEntry(di, object) {
        var _this = _super.call(this, di) || this;
        _this.Object = object;
        return _this;
    }
    ObjectEntry.prototype.using = function (objectDefinitions) {
        if (arguments.length !== 1) {
            throw new Error('Invalid argument count in using for an ObjectEntry');
        }
        for (var key in objectDefinitions) {
            var paramResolver = ParamResolver_1.ParamResolver.create(this.di, objectDefinitions[key]);
            this.resolvers.push([key, paramResolver]);
        }
        return this;
    };
    ObjectEntry.prototype.resolve = function (currentObject) {
        if (this.cfg_singleton) {
            return this.Object;
        }
        var object = Object.create(this.Object);
        var arr = this.resolvers, i = arr.length;
        while (--i > -1) {
            var resolverEntry = this.resolvers[i];
            var key = resolverEntry[0], Resolver = resolverEntry[1];
            var arg = currentObject == null ? null : currentObject[key];
            var val = Resolver.resolve(arg);
            object[key] = val;
        }
        for (var name in currentObject) {
            if (object[name] == null) {
                object[name] = currentObject[name];
            }
        }
        return object;
    };
    ObjectEntry.prototype.wrap = function () {
        return this.resolve.bind(this);
    };
    ObjectEntry.prototype.Entry = function () {
        return this.Object;
    };
    return ObjectEntry;
}(Entry_1.Entry));
exports.ObjectEntry = ObjectEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_ObjectEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_ObjectEntry, module.exports);
		return;
	}
	_src_Entries_ObjectEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeMeta_1 = _src_TypeMeta;
function deco_param(mix) {
    var opts;
    if (mix == null) {
        opts = {};
    }
    else if (typeof mix === 'function') {
        opts = {
            Type: mix
        };
    }
    else if (typeof mix === 'object') {
        opts = mix;
    }
    return function (target, propertyKey, index) {
        TypeMeta_1.TypeMeta.defineParam(target, opts, index);
    };
}
exports.deco_param = deco_param;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco) && isObject(module.exports)) {
		Object.assign(_src_deco, module.exports);
		return;
	}
	_src_deco = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Di;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntryCollection_1 = _src_Entries_EntryCollection;
var MetaReader_1 = _src_Entries_MetaReader;
var TypeEntry_1 = _src_Entries_TypeEntry;
var FnEntry_1 = _src_Entries_FnEntry;
var ObjectEntry_1 = _src_Entries_ObjectEntry;
var deco_1 = _src_deco;
var Di = /** @class */ (function () {
    function Di(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        this.default = this;
        this.di = this;
        this.entries = new EntryCollection_1.EntryCollection(this);
        this.metaReader = new MetaReader_1.MetaReader();
        this.param = deco_1.deco_param;
    }
    Di.prototype.new = function () {
        return new Di(this);
    };
    Di.prototype.registerType = function (Type) {
        return this.Type(Type).register();
    };
    Di.prototype.registerFactory = function (Fn) {
        return this.Function(Fn).register();
    };
    Di.prototype.Type = function (Type) {
        return new TypeEntry_1.TypeEntry(this, Type);
    };
    Di.prototype.Function = function (fn) {
        return new FnEntry_1.FnEntry(this, fn);
    };
    Di.prototype.Object = function (object) {
        return new ObjectEntry_1.ObjectEntry(this, object);
    };
    Di.prototype.resolve = function (mix) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.entries).resolve.apply(_a, __spreadArrays([mix], args));
    };
    Di.prototype.wrapType = function (Type) {
        return this.entries.getFor(Type).wrap();
    };
    Di.Di = Di;
    Di.di = new Di;
    Di.default = Di.di;
    Di.param = deco_1.deco_param;
    return Di;
}());
exports.Di = Di;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Di) && isObject(module.exports)) {
		Object.assign(_src_Di, module.exports);
		return;
	}
	_src_Di = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var Di_1 = _src_Di;
var di = Di_1.Di.di;
module.exports = di;


}));
