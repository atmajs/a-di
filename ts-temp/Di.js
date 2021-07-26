"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Di = void 0;
var EntryCollection_1 = require("./Entries/EntryCollection");
var MetaReader_1 = require("./Entries/MetaReader");
var TypeEntry_1 = require("./Entries/TypeEntry");
var FnEntry_1 = require("./Entries/FnEntry");
var ObjectEntry_1 = require("./Entries/ObjectEntry");
var deco_1 = require("./deco");
var Di = /** @class */ (function () {
    /**
     * @param parent Optionaly pass the parent container
     */
    function Di(parent) {
        if (parent === void 0) { parent = null; }
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
    Di.prototype.new = function () {
        return new Di(this);
    };
    /**
     * Create and register a Type: create mapping, aliases, etc
     * Example: `di.registerType(Foo).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the registration flow
     */
    Di.prototype.registerType = function (Type) {
        return this.Type(Type).register();
    };
    /**
     * Manually start registering a Type Factory
     * Example: `di.registerFactory(di => { return SomeInstance; }).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the configuration flow
     */
    Di.prototype.registerFactory = function (Fn) {
        return this.Factory(Fn).register();
    };
    /**
     * Creates a Type, same as `registerType` but doesn't register within this Di context
     */
    Di.prototype.Type = function (Type) {
        return new TypeEntry_1.TypeEntry(this, Type);
    };
    Di.prototype.Factory = function (fn) {
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
        return (_a = this.entries).resolve.apply(_a, __spreadArray([mix], args));
    };
    Di.prototype.wrapType = function (Type) {
        return this.entries.getFor(Type).wrap();
    };
    /** Alias for `inject`*/
    Di.param = deco_1.deco_param;
    Di.inject = deco_1.deco_param;
    /** Supports import { Di } from 'a-di' */
    Di.Di = Di;
    /** Supports import { di } from 'a-di' */
    Di.di = new Di;
    /** Supports import di from 'a-di' */
    Di.default = Di.di;
    return Di;
}());
exports.Di = Di;
;
