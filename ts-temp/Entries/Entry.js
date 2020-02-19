"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../const");
var ParamResolver_1 = require("../Params/ParamResolver");
var Entry = /** @class */ (function () {
    function Entry(di) {
        this.di = di;
        this._as = [];
        this._using = [];
        this._params = [];
        this._resolvers = [];
        this.cfg_arguments = const_1.Opts.args.OVERRIDE;
        this.cfg_singleton = true;
        this.onActivatedCb = null;
    }
    Entry.prototype.config = function (key, value) {
        var prop = 'cfg_' + key;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    };
    Entry.prototype.using = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._using).push.apply(_a, args);
        var resolvers = new Array(args.length), imax = args.length, i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver_1.ParamResolver.create(this.di, args[i]);
        }
        this._resolvers.push.apply(this._resolvers, resolvers);
        return this;
    };
    Entry.prototype.isSingleton = function (val) {
        if (val === void 0) { val = true; }
        this.cfg_singleton = val;
        return this;
    };
    Entry.prototype.as = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._as).push.apply(_a, args);
        var i = args.length, entries = this.di.entries;
        while (--i > -1) {
            entries.registerFor(args[i], this);
        }
        return this;
    };
    Entry.prototype.register = function () {
        var coll = this.di.entries;
        var Entry = this.Entry();
        coll.removeFor(Entry);
        coll.registerFor(Entry, this);
        coll.add(this);
        return this;
    };
    Entry.prototype.asSelf = function () {
        this.di.entries.registerFor(this.Entry(), this);
        return this;
    };
    Entry.prototype.resolve = function (mix) {
        throw new Error('Not implemented');
    };
    Entry.prototype.onActivated = function (fn) {
        this.onActivatedCb = fn;
    };
    Entry.prototype.Entry = function () {
        throw new Error('Not implemented');
    };
    return Entry;
}());
exports.Entry = Entry;
;
