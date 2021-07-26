"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyParamResolver = void 0;
var EmptyParamResolver = /** @class */ (function () {
    function EmptyParamResolver() {
    }
    EmptyParamResolver.prototype.resolve = function (current) {
        return current;
    };
    return EmptyParamResolver;
}());
exports.EmptyParamResolver = EmptyParamResolver;
;
