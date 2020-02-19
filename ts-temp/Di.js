"use strict";
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
        return this.entries.resolve(mix);
    };
    Di.prototype.wrapType = function (Type) {
        return this.entries.getFor(Type).wrap();
    };
    Di.Di = Di;
    Di.di = new Di;
    return Di;
}());
exports.Di = Di;
;
