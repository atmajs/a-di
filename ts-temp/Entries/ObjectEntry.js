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
var Entry_1 = require("./Entry");
var ParamResolver_1 = require("../Params/ParamResolver");
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
