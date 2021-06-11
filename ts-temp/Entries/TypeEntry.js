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
var BaseMethodEntry_1 = require("./BaseMethodEntry");
var TypeMeta_1 = require("../TypeMeta");
var TypeEntry = /** @class */ (function (_super) {
    __extends(TypeEntry, _super);
    function TypeEntry(di, Type) {
        var _this = _super.call(this, di, Type) || this;
        _this._singleton = null;
        _this._singletons = new Map();
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
        if (this.cfg_singleton === true && this._singleton != null && this._meta.hasSingletonParams !== true) {
            return this._singleton;
        }
        var params = this.getParams_.apply(this, args);
        var paramsKey = null;
        if (this.cfg_singleton === true && this._meta.hasSingletonParams) {
            var singletonArgs = [];
            var paramsMeta = this._meta.params;
            for (var i = 0; i < paramsMeta.length && i < params.length; i++) {
                if ((_a = paramsMeta[i]) === null || _a === void 0 ? void 0 : _a.singleton) {
                    singletonArgs.push(params[i]);
                }
            }
            paramsKey = Args.getKey(singletonArgs);
            if (this._singletons.has(paramsKey)) {
                return this._singletons.get(paramsKey);
            }
        }
        else if (args.length > 0) {
            paramsKey = Args.getKey(args);
        }
        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        var instance = new (Ctor.bind.apply(Ctor, __spreadArrays([void 0], params)))();
        if (this.cfg_singleton === true) {
            if (paramsKey != null) {
                this._singletons.set(paramsKey, instance);
            }
            else {
                this._singleton = instance;
            }
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
