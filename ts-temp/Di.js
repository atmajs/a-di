"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntryCollection_1 = require("./Entries/EntryCollection");
var MetaReader_1 = require("./Entries/MetaReader");
var TypeEntry_1 = require("./Entries/TypeEntry");
var FnEntry_1 = require("./Entries/FnEntry");
var ObjectEntry_1 = require("./Entries/ObjectEntry");
var Di = /** @class */ (function () {
    function Di(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        this.default = this;
        this.di = this;
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
