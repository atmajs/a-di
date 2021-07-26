"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaReader = void 0;
var MetaReader = /** @class */ (function () {
    function MetaReader() {
    }
    MetaReader.prototype.readFromType = function (Type) {
        return Type.$constructor;
    };
    return MetaReader;
}());
exports.MetaReader = MetaReader;
;
