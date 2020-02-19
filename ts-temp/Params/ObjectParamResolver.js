"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("../utils/is");
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
