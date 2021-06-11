import { BaseMethodEntry } from './BaseMethodEntry';
import { IType } from './IType';
import { Di } from '../Di';
import { ITypeMeta, TypeMeta } from '../TypeMeta';

export class TypeEntry<T = any> extends BaseMethodEntry {

    Type: IType<T>

    private _singleton: T = null
    private _singletons = new Map<string, T>()


    constructor(di: Di, Type: IType<T>) {
        super(di, Type);
        this.Type = Type;
    }

    Entry() {
        return this.Type;
    }

    resolve (...args): T {
        const Ctor = this.Type;

        if (this._meta == null) {
            this._meta = TypeMeta.prepairMeta(Ctor);
        }
        if (this.cfg_singleton === true && this._singleton != null && this._meta.hasSingletonParams !== true) {
            return this._singleton;
        }
        let params = this.getParams_(...args);
        let paramsKey = null;

        if (this.cfg_singleton === true && this._meta.hasSingletonParams) {
            let singletonArgs = [];
            let paramsMeta = this._meta.params;
            for (let i = 0; i < paramsMeta.length && i < params.length; i++) {
                if (paramsMeta[i]?.singleton) {
                    singletonArgs.push(params[i]);
                }
            }
            paramsKey = Args.getKey(singletonArgs);
            if (this._singletons.has(paramsKey)) {
                return this._singletons.get(paramsKey);
            }
        } else if (args.length > 0) {
            paramsKey = Args.getKey(args);
        }

        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        const instance = new Ctor(...params) as any as T;
        if (this.cfg_singleton === true) {
            if (paramsKey != null) {
                this._singletons.set(paramsKey, instance);
            } else {
                this._singleton = instance;
            }
        }
        return instance;
    }

    wrap <TOut = T>(): TOut {
        const self = this;
        return <any> function (...args) {
            return self.resolve(...args);
        };
    }
};

export namespace Args {
    const WARN_KEY_LENGTH = 1024;
    export function getKey(args: any[]) {
        let key = '';
        for (let i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i]);
        }
        if (key.length > WARN_KEY_LENGTH) {
            console.error(`DI: Singleton by arguments has the keylength of ${key.length}c. Consider to use lightweight objects.`)
        }
        return key;
    }
    function getKeySingle (misc: any) {
        if (misc == null) {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc);
        }
        let str = '';
        for (let key in misc) {
            str += '.' + getKeySingle(misc[key]);
        }
        return str;
    }
}
