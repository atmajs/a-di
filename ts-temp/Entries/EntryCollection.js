"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeEntry_1 = require("./TypeEntry");
var EntryCollection = /** @class */ (function () {
    function EntryCollection(di) {
        this.di = di;
        this.arr = [];
        this.ids = {};
        this.types = {};
    }
    EntryCollection.prototype.add = function (entry) {
        this.arr.push(entry);
    };
    EntryCollection.prototype.resolve = function (mix) {
        if (mix == null) {
            throw new Error('Resolve argument is undefined');
        }
        var entry = null;
        if (typeof mix === 'string') {
            entry = this.ids[entry];
            if (entry == null) {
                throw Error("Entry for Type '" + mix + "' not found");
            }
        }
        if (typeof mix === 'function') {
            entry = this.getForType(mix);
            if (entry == null) {
                entry = new TypeEntry_1.TypeEntry(this.di, mix);
                this.registerFor(mix, entry);
            }
        }
        return entry.resolve();
    };
    EntryCollection.prototype.getByType = function (Type) {
        var arr = this.arr;
        var i = arr.length;
        while (--i > -1) {
            var x = arr[i];
            if (x.Type === Type) {
                return x;
            }
        }
        return null;
    };
    EntryCollection.prototype.getFor = function (mix, required) {
        if (required === void 0) { required = false; }
        if (typeof mix === 'string') {
            var entry = this.ids[mix];
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix + "\"");
            }
            return entry;
        }
        if (typeof mix === 'function') {
            var entry = this.getForType(mix);
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix.name + "\"");
            }
            return entry;
        }
        throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
    };
    EntryCollection.prototype.getForType = function (Type) {
        var _a;
        var name = Type.name;
        var arr = this.types[name];
        if (arr != null) {
            var i = arr.length;
            while (--i > -1) {
                var x = arr[i];
                if (x.Type === Type) {
                    return x.entry;
                }
            }
        }
        return (_a = this.di.parent) === null || _a === void 0 ? void 0 : _a.entries.getForType(Type);
    };
    EntryCollection.prototype.removeForType = function (Type) {
        var arr = this.types[Type.name];
        if (arr == null) {
            return;
        }
        var imax = arr.length, i = -1;
        while (++i < imax) {
            var x = arr[i];
            if (x.Type === Type) {
                arr.splice(i, 1);
                return;
            }
        }
    };
    EntryCollection.prototype.removeFor = function (mix) {
        if (typeof mix === 'string') {
            this.ids[mix] = null;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                return;
            }
            var i = arr.length;
            while (--i !== -1) {
                if (arr[i].Type === mix) {
                    arr.splice(i, 1);
                }
            }
            return;
        }
    };
    EntryCollection.prototype.registerFor = function (mix, entry) {
        if (typeof mix === 'string') {
            this.ids[mix] = entry;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                arr = this.types[name] = [];
            }
            arr.push({
                Type: mix,
                entry: entry
            });
            return;
        }
        throw Error('Collection::registerFor. Unsupported value type: ' + (typeof mix));
    };
    return EntryCollection;
}());
exports.EntryCollection = EntryCollection;
;
