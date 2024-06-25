
// source ./ESM.js
var module = {
    exports: {}
};

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
    var exports = _src_const != null ? _src_const : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opts = void 0;
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
//# sourceMappingURL=const.js.map
//# sourceMappingURL=const.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_const === module.exports) {
        // do nothing if
    } else if (__isObj(_src_const) && __isObj(module.exports)) {
        Object.assign(_src_const, module.exports);
    } else {
        _src_const = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_is != null ? _src_utils_is : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Is = void 0;
exports.Is = {
    Object(mix) {
        return mix != null
            && typeof mix === 'object'
            && mix.toString() === '[object Object]';
    }
};
//# sourceMappingURL=is.js.map
//# sourceMappingURL=is.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_is === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_is) && __isObj(module.exports)) {
        Object.assign(_src_utils_is, module.exports);
    } else {
        _src_utils_is = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_EmptyParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Params_EmptyParamResolver != null ? _src_Params_EmptyParamResolver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyParamResolver = void 0;
class EmptyParamResolver {
    resolve(current) {
        return current;
    }
}
exports.EmptyParamResolver = EmptyParamResolver;
;
//# sourceMappingURL=EmptyParamResolver.js.map
//# sourceMappingURL=EmptyParamResolver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Params_EmptyParamResolver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Params_EmptyParamResolver) && __isObj(module.exports)) {
        Object.assign(_src_Params_EmptyParamResolver, module.exports);
    } else {
        _src_Params_EmptyParamResolver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ObjectParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Params_ObjectParamResolver != null ? _src_Params_ObjectParamResolver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectParamResolver = void 0;
const is_1 = _src_utils_is;
class ObjectParamResolver {
    constructor(di, object) {
        this.object = object;
        this.entries = di.entries;
    }
    resolve(currentParam) {
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
    }
}
exports.ObjectParamResolver = ObjectParamResolver;
//# sourceMappingURL=ObjectParamResolver.js.map
//# sourceMappingURL=ObjectParamResolver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Params_ObjectParamResolver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Params_ObjectParamResolver) && __isObj(module.exports)) {
        Object.assign(_src_Params_ObjectParamResolver, module.exports);
    } else {
        _src_Params_ObjectParamResolver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_BaseParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Params_BaseParamResolver != null ? _src_Params_BaseParamResolver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParamResolver = void 0;
class BaseParamResolver {
    constructor(di, mix) {
        this.entry = di.entries.getFor(mix, true);
    }
    resolve(currentParam) {
        if (currentParam != null) {
            return currentParam;
        }
        return this.entry.resolve();
    }
}
exports.BaseParamResolver = BaseParamResolver;
;
//# sourceMappingURL=BaseParamResolver.js.map
//# sourceMappingURL=BaseParamResolver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Params_BaseParamResolver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Params_BaseParamResolver) && __isObj(module.exports)) {
        Object.assign(_src_Params_BaseParamResolver, module.exports);
    } else {
        _src_Params_BaseParamResolver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Params_ParamResolver != null ? _src_Params_ParamResolver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamResolver = void 0;
const is_1 = _src_utils_is;
const EmptyParamResolver_1 = _src_Params_EmptyParamResolver;
const ObjectParamResolver_1 = _src_Params_ObjectParamResolver;
const BaseParamResolver_1 = _src_Params_BaseParamResolver;
exports.ParamResolver = {
    create(di, mix) {
        if (mix == null) {
            return new EmptyParamResolver_1.EmptyParamResolver();
        }
        if (is_1.Is.Object(mix)) {
            return new ObjectParamResolver_1.ObjectParamResolver(di, mix);
        }
        return new BaseParamResolver_1.BaseParamResolver(di, mix);
    },
    createMany(di, arr) {
        var out = new Array(arr.length), i = arr.length;
        while (--i !== -1) {
            out[i] = exports.ParamResolver.create(di, arr[i]);
        }
        return out;
    }
};
//# sourceMappingURL=ParamResolver.js.map
//# sourceMappingURL=ParamResolver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Params_ParamResolver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Params_ParamResolver) && __isObj(module.exports)) {
        Object.assign(_src_Params_ParamResolver, module.exports);
    } else {
        _src_Params_ParamResolver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_Entry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_Entry != null ? _src_Entries_Entry : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const const_1 = _src_const;
const ParamResolver_1 = _src_Params_ParamResolver;
class Entry {
    constructor(di) {
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
    config(key, value) {
        let prop = `cfg_${key}`;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    }
    using(...args) {
        this._using.push(...args);
        let resolvers = new Array(args.length);
        let imax = args.length;
        let i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver_1.ParamResolver.create(this.di, args[i]);
        }
        this._resolvers.push(...resolvers);
        return this;
    }
    isSingleton(val = true) {
        this.cfg_singleton = val;
        return this;
    }
    for(...args) {
        return this.as(...args);
    }
    as(...args) {
        this._as.push(...args);
        var i = args.length, entries = this.di.entries;
        while (--i > -1) {
            entries.registerFor(args[i], this);
        }
        return this;
    }
    register() {
        let coll = this.di.entries;
        let Entry = this.Entry();
        coll.removeFor(Entry);
        coll.registerFor(Entry, this);
        coll.add(this);
        return this;
    }
    asSelf() {
        this.di.entries.registerFor(this.Entry(), this);
        return this;
    }
    resolve(...args) {
        throw new Error('Not implemented');
    }
    onActivated(fn) {
        this.onActivatedCb = fn;
    }
    Entry() {
        throw new Error('Not implemented');
    }
}
exports.Entry = Entry;
;
//# sourceMappingURL=Entry.js.map
//# sourceMappingURL=Entry.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_Entry === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_Entry) && __isObj(module.exports)) {
        Object.assign(_src_Entries_Entry, module.exports);
    } else {
        _src_Entries_Entry = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_TypeMeta;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_TypeMeta != null ? _src_TypeMeta : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMeta = void 0;
var TypeMeta;
(function (TypeMeta) {
    const map = new Map();
    function defineParam(Ctor, opts, index) {
        const meta = ensureMeta(Ctor);
        meta.params[index] = opts;
    }
    TypeMeta.defineParam = defineParam;
    function pickMeta(Ctor) {
        return map.get(Ctor);
    }
    function ensureMeta(Ctor) {
        let current = map.get(Ctor);
        if (current == null) {
            current = { params: [] };
            map.set(Ctor, current);
        }
        return current;
    }
    function prepairMeta(Ctor) {
        let meta = ensureMeta(Ctor);
        meta.hasSingletonParams = meta.params.some(x => x === null || x === void 0 ? void 0 : x.singleton);
        return meta;
    }
    TypeMeta.prepairMeta = prepairMeta;
})(TypeMeta = exports.TypeMeta || (exports.TypeMeta = {}));
//# sourceMappingURL=TypeMeta.js.map
//# sourceMappingURL=TypeMeta.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_TypeMeta === module.exports) {
        // do nothing if
    } else if (__isObj(_src_TypeMeta) && __isObj(module.exports)) {
        Object.assign(_src_TypeMeta, module.exports);
    } else {
        _src_TypeMeta = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_BaseMethodEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_BaseMethodEntry != null ? _src_Entries_BaseMethodEntry : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMethodEntry = void 0;
const Entry_1 = _src_Entries_Entry;
const const_1 = _src_const;
const TypeMeta_1 = _src_TypeMeta;
class BaseMethodEntry extends Entry_1.Entry {
    constructor(di, Entry) {
        super(di);
        if (typeof Entry !== 'function') {
            throw new Error('Invalid argument. Function expected');
        }
        let using = di.metaReader.readFromType(Entry);
        if (using != null) {
            this.using.apply(this, using);
        }
    }
    withParams(...args) {
        this._params = args;
        return this;
    }
    getParams_(...args) {
        var _a;
        const Entry = this.Entry();
        const resolvers = this._resolvers;
        const params = this._params;
        const meta = (_a = this._meta) !== null && _a !== void 0 ? _a : (this._meta = TypeMeta_1.TypeMeta.prepairMeta(Entry));
        const argsIgnore = this.cfg_arguments === const_1.Opts.args.IGNORE;
        const argsExtend = this.cfg_arguments === const_1.Opts.args.EXTEND;
        const argsOverride = this.cfg_arguments === const_1.Opts.args.OVERRIDE;
        let size = resolvers.length;
        if (size < params.length) {
            size = params.length;
        }
        if (size < Entry.length) {
            size = Entry.length;
        }
        let argsLength = args.length;
        for (let i = argsLength - 1; i >= 0; i--) {
            // ignore tail arguments when provided as nulls
            if (args[i] != null) {
                break;
            }
            argsLength = i;
        }
        if (argsIgnore === false) {
            if (argsExtend) {
                size += argsLength;
            }
            if (argsOverride && argsLength > size) {
                size = argsLength;
            }
        }
        let ctorParams = new Array(size);
        let i = -1;
        while (++i < size) {
            let arg = null;
            if (i < params.length && params[i] != null) {
                arg = argsIgnore === false && i < argsLength && args[i] != null
                    ? args[i]
                    : params[i];
            }
            if (arg == null && i < resolvers.length && resolvers[i] != null) {
                let currentArg = argsIgnore === false && i < argsLength
                    ? args[i]
                    : void 0;
                arg = resolvers[i].resolve(currentArg);
            }
            if (arg == null && i < meta.params.length && meta.params[i] != null) {
                let paramMeta = meta.params[i];
                if (paramMeta === null || paramMeta === void 0 ? void 0 : paramMeta.Type) {
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
            if (argsOverride && i < argsLength) {
                ctorParams[i] = args[i];
                continue;
            }
            if (argsExtend && i >= size - argsLength) {
                var j = i - size - argsLength;
                ctorParams[i] = args[j];
                continue;
            }
        }
        return ctorParams;
    }
}
exports.BaseMethodEntry = BaseMethodEntry;
;
//# sourceMappingURL=BaseMethodEntry.js.map
//# sourceMappingURL=BaseMethodEntry.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_BaseMethodEntry === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_BaseMethodEntry) && __isObj(module.exports)) {
        Object.assign(_src_Entries_BaseMethodEntry, module.exports);
    } else {
        _src_Entries_BaseMethodEntry = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_TypeEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_TypeEntry != null ? _src_Entries_TypeEntry : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = exports.TypeEntry = void 0;
const BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
const TypeMeta_1 = _src_TypeMeta;
class TypeEntry extends BaseMethodEntry_1.BaseMethodEntry {
    constructor(di, Type) {
        super(di, Type);
        this._holder = new SingletonsHolder();
        this.Type = Type;
    }
    Entry() {
        return this.Type;
    }
    resolve(...args) {
        var _a;
        const Ctor = this.Type;
        if (this._meta == null) {
            this._meta = TypeMeta_1.TypeMeta.prepairMeta(Ctor);
        }
        let params = this.getParams_(...args);
        let paramsKey = null;
        if (this.cfg_singleton === true) {
            if (this._meta.hasSingletonParams) {
                let singletonArgs = [];
                let paramsMeta = this._meta.params;
                for (let i = 0; i < paramsMeta.length && i < params.length; i++) {
                    if ((_a = paramsMeta[i]) === null || _a === void 0 ? void 0 : _a.singleton) {
                        singletonArgs.push(params[i]);
                    }
                }
                paramsKey = this._holder.createKey(singletonArgs);
            }
            else if (args.length > 0) {
                paramsKey = this._holder.createKey(args);
            }
            let singleton = this._holder.getByKey(paramsKey);
            if (singleton != null) {
                return singleton;
            }
        }
        const instance = new Ctor(...params);
        if (this.cfg_singleton === true) {
            this._holder.saveByKey(paramsKey, instance);
        }
        return instance;
    }
    wrap() {
        const self = this;
        return function (...args) {
            return self.resolve(...args);
        };
    }
}
exports.TypeEntry = TypeEntry;
;
var Args;
(function (Args) {
    const WARN_KEY_LENGTH = 1024;
    const MAX_LEVEL = 2;
    function getKey(args, level = 0) {
        let key = '';
        for (let i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i], level);
        }
        if (key.length > WARN_KEY_LENGTH) {
            console.error(`DI: Singleton by arguments has the keylength of ${key.length}c. Consider to use lightweight objects. ${key}`);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc, level = 0) {
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
            return `l_${level}`;
        }
        let str = '';
        for (let key in misc) {
            let val = misc[key];
            let partial = getKeySingle(val, level + 1);
            if (partial != null && partial !== '') {
                str += '.' + partial;
            }
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
class SingletonsHolder {
    constructor() {
        this.singletonsByKey = new Map();
        this.singletonsByComplex = [];
    }
    saveByKey(key, val) {
        if (key == null) {
            this.singleton = val;
            return;
        }
        if (typeof key === 'string') {
            this.singletonsByKey.set(key, val);
            return;
        }
        this.singletonsByComplex.push([key, val]);
    }
    getByKey(key) {
        if (key == null) {
            return this.singleton;
        }
        if (typeof key === 'string') {
            return this.singletonsByKey.get(key);
        }
        let arrSingles = this.singletonsByComplex;
        let keyArr = key;
        outer: for (let i = 0; i < arrSingles.length; i++) {
            let [checkKey, val] = arrSingles[i];
            if (checkKey.length !== keyArr.length) {
                continue;
            }
            for (let j = 0; j < keyArr.length; j++) {
                if (keyArr[j] !== checkKey[j]) {
                    continue outer;
                }
            }
            return val;
        }
        return null;
    }
    createKey(args) {
        var _a;
        if (args == null || args.length === 0) {
            return null;
        }
        let argsLength = args.length;
        for (let i = argsLength - 1; i >= 0; i--) {
            // ignore tail arguments when provided as nulls
            if (args[i] != null) {
                break;
            }
            argsLength = i;
        }
        let key;
        let arr;
        let isComplex = false;
        for (let i = 0; i < argsLength; i++) {
            let val = (_a = args[i]) !== null && _a !== void 0 ? _a : '';
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
                key = key == null ? String(val) : `${key}.${val}`;
                continue;
            }
            if (Array.isArray(val) || val.constructor === Object || val.constructor == null) {
                // Simple object?
                let objectKey = ToKey.toKey(val);
                if (objectKey != null) {
                    key = key == null ? String(objectKey) : `${key}.${objectKey}`;
                    continue;
                }
            }
            isComplex = true;
            arr = key == null ? [val] : [key, val];
        }
        return isComplex ? arr : key;
    }
}
var ToKey;
(function (ToKey) {
    const MAX_DEEP = 3;
    const MAX_ARR_LENGTH = 50;
    function fromObject(obj, level = 0) {
        if (level > MAX_DEEP) {
            return null;
        }
        let key = '';
        for (let prop in obj) {
            let val = obj[prop];
            if (val == null || typeof val === 'function') {
                continue;
            }
            let nextKey = toKey(val, level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : `${key}.${nextKey}`;
        }
        return key;
    }
    function fromArray(arr, level = 0) {
        if (level > MAX_DEEP || (arr === null || arr === void 0 ? void 0 : arr.length) > MAX_ARR_LENGTH) {
            return null;
        }
        if (arr.length === 0) {
            return '';
        }
        let key = null;
        for (let i = 0; i < arr.length; i++) {
            let nextKey = toKey(arr[i], level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : `${key}.${nextKey}`;
        }
        return key;
    }
    function toKey(mix, level = 0) {
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
//# sourceMappingURL=TypeEntry.js.map
//# sourceMappingURL=TypeEntry.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_TypeEntry === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_TypeEntry) && __isObj(module.exports)) {
        Object.assign(_src_Entries_TypeEntry, module.exports);
    } else {
        _src_Entries_TypeEntry = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_EntryCollection;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_EntryCollection != null ? _src_Entries_EntryCollection : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryCollection = void 0;
const TypeEntry_1 = _src_Entries_TypeEntry;
class EntryCollection {
    constructor(di) {
        this.di = di;
        this.arr = [];
        this.ids = {};
        this.types = {};
    }
    add(entry) {
        this.arr.push(entry);
    }
    resolve(mix, ...args) {
        if (mix == null) {
            throw new Error('Resolve argument is undefined');
        }
        let entry = null;
        if (typeof mix === 'string') {
            entry = this.ids[mix];
            if (entry == null) {
                throw Error(`Entry for Type '${mix}' not found`);
            }
        }
        if (typeof mix === 'function') {
            entry = this.getForType(mix);
            if (entry == null) {
                entry = new TypeEntry_1.TypeEntry(this.di, mix);
                this.registerFor(mix, entry);
            }
        }
        return entry.resolve(...args);
    }
    getByType(Type) {
        let arr = this.arr;
        let i = arr.length;
        while (--i > -1) {
            let x = arr[i];
            if (x.Type === Type) {
                return x;
            }
        }
        return null;
    }
    getFor(mix, required = false) {
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
    }
    getForType(Type) {
        var _a;
        let name = Type.name;
        let arr = this.types[name];
        if (arr != null) {
            let i = arr.length;
            while (--i > -1) {
                var x = arr[i];
                if (x.Type === Type) {
                    return x.entry;
                }
            }
        }
        return (_a = this.di.parent) === null || _a === void 0 ? void 0 : _a.entries.getForType(Type);
    }
    removeForType(Type) {
        var arr = this.types[Type.name];
        if (arr == null) {
            return;
        }
        let imax = arr.length, i = -1;
        while (++i < imax) {
            var x = arr[i];
            if (x.Type === Type) {
                arr.splice(i, 1);
                return;
            }
        }
    }
    removeFor(mix) {
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
    }
    removeAll() {
        this.types = {};
        this.arr = [];
    }
    registerFor(mix, entry) {
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
}
exports.EntryCollection = EntryCollection;
;
//# sourceMappingURL=EntryCollection.js.map
//# sourceMappingURL=EntryCollection.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_EntryCollection === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_EntryCollection) && __isObj(module.exports)) {
        Object.assign(_src_Entries_EntryCollection, module.exports);
    } else {
        _src_Entries_EntryCollection = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_MetaReader;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_MetaReader != null ? _src_Entries_MetaReader : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaReader = void 0;
class MetaReader {
    readFromType(Type) {
        return Type.$constructor;
    }
}
exports.MetaReader = MetaReader;
;
//# sourceMappingURL=MetaReader.js.map
//# sourceMappingURL=MetaReader.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_MetaReader === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_MetaReader) && __isObj(module.exports)) {
        Object.assign(_src_Entries_MetaReader, module.exports);
    } else {
        _src_Entries_MetaReader = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_FnEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_FnEntry != null ? _src_Entries_FnEntry : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnEntry = void 0;
const BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
class FnEntry extends BaseMethodEntry_1.BaseMethodEntry {
    constructor(di, fn) {
        super(di, fn);
        this.Fn = fn;
    }
    Entry() {
        return this.Fn;
    }
    resolve(...args) {
        let params = this.getParams_(...args);
        return this.Fn.apply(null, params);
    }
    wrap() {
        return this.resolve.bind(this);
    }
}
exports.FnEntry = FnEntry;
;
//# sourceMappingURL=FnEntry.js.map
//# sourceMappingURL=FnEntry.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_FnEntry === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_FnEntry) && __isObj(module.exports)) {
        Object.assign(_src_Entries_FnEntry, module.exports);
    } else {
        _src_Entries_FnEntry = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_ObjectEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Entries_ObjectEntry != null ? _src_Entries_ObjectEntry : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectEntry = void 0;
const Entry_1 = _src_Entries_Entry;
const ParamResolver_1 = _src_Params_ParamResolver;
class ObjectEntry extends Entry_1.Entry {
    constructor(di, object) {
        super(di);
        this.Object = object;
    }
    using(objectDefinitions) {
        if (arguments.length !== 1) {
            throw new Error('Invalid argument count in using for an ObjectEntry');
        }
        for (var key in objectDefinitions) {
            var paramResolver = ParamResolver_1.ParamResolver.create(this.di, objectDefinitions[key]);
            this.resolvers.push([key, paramResolver]);
        }
        return this;
    }
    resolve(currentObject) {
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
    }
    wrap() {
        return this.resolve.bind(this);
    }
    Entry() {
        return this.Object;
    }
}
exports.ObjectEntry = ObjectEntry;
;
//# sourceMappingURL=ObjectEntry.js.map
//# sourceMappingURL=ObjectEntry.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Entries_ObjectEntry === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Entries_ObjectEntry) && __isObj(module.exports)) {
        Object.assign(_src_Entries_ObjectEntry, module.exports);
    } else {
        _src_Entries_ObjectEntry = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_deco != null ? _src_deco : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_for = exports.deco_param = void 0;
const TypeMeta_1 = _src_TypeMeta;
function deco_param(mix) {
    let opts;
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
function deco_for(mix) {
    let di = this;
    return function (target) {
        di.registerType(target).as(mix);
        return target;
    };
}
exports.deco_for = deco_for;
//# sourceMappingURL=deco.js.map
//# sourceMappingURL=deco.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_deco === module.exports) {
        // do nothing if
    } else if (__isObj(_src_deco) && __isObj(module.exports)) {
        Object.assign(_src_deco, module.exports);
    } else {
        _src_deco = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Di;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Di != null ? _src_Di : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Di = void 0;
const EntryCollection_1 = _src_Entries_EntryCollection;
const MetaReader_1 = _src_Entries_MetaReader;
const TypeEntry_1 = _src_Entries_TypeEntry;
const FnEntry_1 = _src_Entries_FnEntry;
const ObjectEntry_1 = _src_Entries_ObjectEntry;
const deco_1 = _src_deco;
class Di {
    /**
     * @param parent Optionaly pass the parent container
     */
    constructor(parent = null) {
        this.parent = parent;
        /** Container for registered Types */
        this.entries = new EntryCollection_1.EntryCollection(this);
        /** Reader to get meta information from a Type */
        this.metaReader = new MetaReader_1.MetaReader();
        /** Alias for `inject`*/
        this.param = deco_1.deco_param;
        this.inject = deco_1.deco_param;
        //static for = deco_for;
        /**
         * Class Decorator to specify for which type is this implementation
         * ```
         * @di.for(AFoo)
         * class Foo {}
         * ```
         */
        this.for = deco_1.deco_for;
        /** Supports import di from 'a-di' */
        this.default = this;
        /** Supports import {  di } from 'a-di' */
        this.di = this;
    }
    /** Create new Di scope using current di as the parent container */
    new() {
        return new Di(this);
    }
    /**
     * Create and register a Type: create mapping, aliases, etc
     * Example: `di.registerType(Foo).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the registration flow
     */
    registerType(Type) {
        return this.Type(Type).register();
    }
    /**
     * Manually start registering a Type Factory
     * Example: `di.registerFactory(di => { return SomeInstance; }).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the configuration flow
     */
    registerFactory(Fn) {
        return this.Factory(Fn).register();
    }
    /**
     * Creates a Type, same as `registerType` but doesn't register within this Di context
     */
    Type(Type) {
        return new TypeEntry_1.TypeEntry(this, Type);
    }
    Factory(fn) {
        return new FnEntry_1.FnEntry(this, fn);
    }
    Object(object) {
        return new ObjectEntry_1.ObjectEntry(this, object);
    }
    resolve(mix, ...args) {
        return this.entries.resolve(mix, ...args);
    }
    wrapType(Type) {
        return this.entries.getFor(Type).wrap();
    }
}
exports.Di = Di;
/** Alias for `inject`*/
Di.param = deco_1.deco_param;
Di.inject = deco_1.deco_param;
/** Supports import { Di } from 'a-di' */
Di.Di = Di;
/** Supports import { di } from 'a-di' */
Di.di = new Di;
/** Supports import di from 'a-di' */
Di.default = Di.di;
;
//# sourceMappingURL=Di.js.map
//# sourceMappingURL=Di.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Di === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Di) && __isObj(module.exports)) {
        Object.assign(_src_Di, module.exports);
    } else {
        _src_Di = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
const Di_1 = _src_Di;
const di = Di_1.Di.di;
module.exports = di;
//# sourceMappingURL=exports.js.map
//# sourceMappingURL=exports.ts.map

export default module.exports;



// end:source ./ESM.js
