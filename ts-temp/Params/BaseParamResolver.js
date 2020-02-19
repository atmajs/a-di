"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseParamResolver = /** @class */ (function () {
    function BaseParamResolver(di, mix) {
        this.entry = di.entries.getFor(mix, true);
    }
    BaseParamResolver.prototype.resolve = function (currentParam) {
        if (currentParam != null) {
            return currentParam;
        }
        return this.entry.resolve();
    };
    return BaseParamResolver;
}());
exports.BaseParamResolver = BaseParamResolver;
;
