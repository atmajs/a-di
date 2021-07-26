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
exports.FnEntry = void 0;
var BaseMethodEntry_1 = require("./BaseMethodEntry");
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
