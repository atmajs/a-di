"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = exports.TypeEntry = void 0;
var BaseMethodEntry_1 = require("./BaseMethodEntry");
var TypeMeta_1 = require("../TypeMeta");
var TypeEntry = /** @class */ (function (_super) {
    __extends(TypeEntry, _super);
    function TypeEntry(di, Type) {
        var _this = _super.call(this, di, Type) || this;
        _this._holder = new SingletonsHolder();
        _this.Type = Type;
        return _this;
    }
    TypeEntry.prototype.Entry = function () {
        return this.Type;
    };
    TypeEntry.prototype.resolve = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
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
                paramsKey = this._holder.createKey(singletonArgs);
            }
            else if (args.length > 0) {
                paramsKey = this._holder.createKey(args);
            }
            var singleton = this._holder.getByKey(paramsKey);
            if (singleton != null) {
                return singleton;
            }
        }
        var instance = new (Ctor.bind.apply(Ctor, __spreadArray([void 0], params)))();
        if (this.cfg_singleton === true) {
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
        var argsLength = args.length;
        for (var i = argsLength - 1; i >= 0; i--) {
            // ignore tail arguments when provided as nulls
            if (args[i] != null) {
                break;
            }
            argsLength = i;
        }
        var key;
        var arr;
        var isComplex = false;
        for (var i = 0; i < argsLength; i++) {
            var val = (_a = args[i]) !== null && _a !== void 0 ? _a : '';
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
        if (level > MAX_DEEP || (arr === null || arr === void 0 ? void 0 : arr.length) > MAX_ARR_LENGTH) {
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
