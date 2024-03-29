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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMethodEntry = void 0;
var Entry_1 = require("./Entry");
var const_1 = require("../const");
var TypeMeta_1 = require("../TypeMeta");
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
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Entry = this.Entry();
        var resolvers = this._resolvers;
        var params = this._params;
        var meta = (_a = this._meta) !== null && _a !== void 0 ? _a : (this._meta = TypeMeta_1.TypeMeta.prepairMeta(Entry));
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
        var argsLength = args.length;
        for (var i_1 = argsLength - 1; i_1 >= 0; i_1--) {
            // ignore tail arguments when provided as nulls
            if (args[i_1] != null) {
                break;
            }
            argsLength = i_1;
        }
        if (argsIgnore === false) {
            if (argsExtend) {
                size += argsLength;
            }
            if (argsOverride && argsLength > size) {
                size = argsLength;
            }
        }
        var ctorParams = new Array(size);
        var i = -1;
        while (++i < size) {
            var arg = null;
            if (i < params.length && params[i] != null) {
                arg = argsIgnore === false && i < argsLength && args[i] != null
                    ? args[i]
                    : params[i];
            }
            if (arg == null && i < resolvers.length && resolvers[i] != null) {
                var currentArg = argsIgnore === false && i < argsLength
                    ? args[i]
                    : void 0;
                arg = resolvers[i].resolve(currentArg);
            }
            if (arg == null && i < meta.params.length && meta.params[i] != null) {
                var paramMeta = meta.params[i];
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
    };
    return BaseMethodEntry;
}(Entry_1.Entry));
exports.BaseMethodEntry = BaseMethodEntry;
;
