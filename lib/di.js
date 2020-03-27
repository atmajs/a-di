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
var _src_const = {};
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
        this.cfg_arguments = const_1.Opts.args.OVERRIDE;
        this.cfg_singleton = true;
        this.onActivatedCb = null;
    }
    Entry.prototype.config = function (key, value) {
        var prop = 'cfg_' + key;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    };
    Entry.prototype.using = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._using).push.apply(_a, args);
        var resolvers = new Array(args.length), imax = args.length, i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver_1.ParamResolver.create(this.di, args[i]);
        }
        this._resolvers.push.apply(this._resolvers, resolvers);
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
    Entry.prototype.wrap = function () {
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
        var resolvers = this._resolvers, params = this._params;
        var argsIgnore = this.cfg_arguments === const_1.Opts.args.IGNORE, argsExtend = this.cfg_arguments === const_1.Opts.args.EXTEND, argsOverride = this.cfg_arguments === const_1.Opts.args.OVERRIDE;
        var size = resolvers.length;
        if (size < params.length)
            size = params.length;
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
                var arg = argsIgnore === false && i < args.length && args[i] != null
                    ? args[i]
                    : params[i];
                ctorParams[i] = arg;
                continue;
            }
            if (i < resolvers.length && resolvers[i] != null) {
                var arg = argsIgnore === false && i < args.length
                    ? args[i]
                    : void 0;
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
        var Fn = this.Entry();
        var expect = Fn.length;
        if (expect > size) {
            throw new Error("Not enough arguments for Method " + Fn.name + ". Got " + size + ". Expect " + expect);
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
var TypeEntry = /** @class */ (function (_super) {
    __extends(TypeEntry, _super);
    function TypeEntry(di, Type) {
        var _this = _super.call(this, di, Type) || this;
        _this._singleton = null;
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
        if (this.cfg_singleton && this._singleton != null) {
            return this._singleton;
        }
        var params = this.getParams_.apply(this, args);
        var Ctor = this.Type;
        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        var instance = new (Ctor.bind.apply(Ctor, __spreadArrays([void 0], params)))();
        if (this.cfg_singleton) {
            this._singleton = instance;
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
    function ObjectEntry(container, object) {
        var _this = _super.call(this, container) || this;
        _this.container = container;
        _this.Object = object;
        return _this;
    }
    ObjectEntry.prototype.using = function (objectDefinitions) {
        if (arguments.length !== 1) {
            throw new Error('Invalid argument count in using for an ObjectEntry');
        }
        for (var key in objectDefinitions) {
            var paramResolver = ParamResolver_1.ParamResolver.create(this.container, objectDefinitions[key]);
            this.resolvers.push([key, paramResolver]);
        }
        return this;
    };
    ObjectEntry.prototype.resolve = function (currentObject) {
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
var Di = /** @class */ (function () {
    function Di(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        this.default = this;
        this.entries = new EntryCollection_1.EntryCollection(this);
        this.metaReader = new MetaReader_1.MetaReader();
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
