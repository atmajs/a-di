import { Opts } from '../const';
import { ParamResolver } from '../Params/ParamResolver';
import { Di } from '../Di'
import { ITypeMeta } from '../TypeMeta';

export abstract class Entry {

    protected _as = [];
    protected _using = [];
    protected _params = [];
    protected _resolvers = [];
    protected _meta: ITypeMeta = null;

    cfg_arguments = Opts.args.OVERRIDE;
    cfg_singleton: boolean = true

    onActivatedCb = null;

    constructor(public di: Di) {

    }

    config(key: 'arguments', value: 'override' | 'ignore' | 'extend')
    config(key: 'singleton', value: boolean | 'arguments')
    config(key, value) {
        let prop = `cfg_${key}`;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    }

    using(...args): this {
        this._using.push(...args);


        var resolvers = new Array(args.length),
            imax = args.length,
            i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver.create(this.di, args[i]);
        }

        this._resolvers.push(...resolvers);
        return this;
    }
    isSingleton (val: boolean = true): this {
        this.cfg_singleton = val;
        return this;
    }

    as(...args): this {
        this._as.push(...args);
        var i = args.length, entries = this.di.entries;
        while (--i > -1) {
            entries.registerFor(args[i], this);
        }
        return this;
    }

    register(): this {
        let coll = this.di.entries;
        let Entry = this.Entry();
        coll.removeFor(Entry);
        coll.registerFor(Entry, this);
        coll.add(this);
        return this;
    }

    asSelf(): this {
        this.di.entries.registerFor(this.Entry(), this);
        return this;
    }

    resolve (...args): any {
        throw new Error('Not implemented');
    }

    onActivated(fn) {
        this.onActivatedCb = fn;
    }

    Entry(): any {
        throw new Error('Not implemented');
    }
    abstract wrap <T = any> (): T
};
