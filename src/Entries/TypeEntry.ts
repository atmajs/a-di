import { BaseMethodEntry } from './BaseMethodEntry';
import { IType } from './IType';
import { Di } from '../Di';
import { ITypeMeta, TypeMeta } from '../TypeMeta';

type TSingletonKey = null | string | any[];

export class TypeEntry<T = any> extends BaseMethodEntry {

    Type: IType<T>

    private _singleton: T = null
    private _singletons = new Map<string, T>()
    private _holder = new SingletonsHolder<T>();


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


        let params = this.getParams_(...args);
        let paramsKey = null as TSingletonKey;

        if (this.cfg_singleton === true) {
            if (this._meta.hasSingletonParams) {
                let singletonArgs = [];
                let paramsMeta = this._meta.params;
                for (let i = 0; i < paramsMeta.length && i < params.length; i++) {
                    if (paramsMeta[i]?.singleton) {
                        singletonArgs.push(params[i]);
                    }
                }
                //-paramsKey = Args.getKey(singletonArgs);
                paramsKey = this._holder.createKey(singletonArgs);
            } else if (args.length > 0) {
                //-paramsKey = Args.getKey(args);
                paramsKey = this._holder.createKey(args);
            }

            // if (paramsKey) {
            //     if (this._singletons.has(paramsKey)) {
            //         return this._singletons.get(paramsKey);
            //     }
            // } else if (this._singleton) {
            //     return this._singleton;
            // }

            let singleton = this._holder.getByKey(paramsKey);
            if (singleton != null) {
                return singleton;
            }
        }



        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        const instance = new Ctor(...params) as any as T;
        if (this.cfg_singleton === true) {
            // if (paramsKey != null) {
            //     this._singletons.set(paramsKey, instance);
            // } else {
            //     this._singleton = instance;
            // }
            this._holder.saveByKey(paramsKey, instance);
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
    const MAX_LEVEL = 2;
    export function getKey(args: any[], level = 0) {
        let key = '';
        for (let i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i], level);
        }
        if (key.length > WARN_KEY_LENGTH) {
            console.error(`DI: Singleton by arguments has the keylength of ${key.length}c. Consider to use lightweight objects. ${key}`)
        }
        return key;
    }
    function getKeySingle (misc: any, level = 0) {
        if (misc == null || typeof misc === 'function') {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc, level);
        }
        if (level >= MAX_LEVEL) {
            return `l_${level}`;
        }

        let str = '';
        for (let key in misc) {
            let val = misc[key];
            let partial = getKeySingle(val, level + 1);
            if (partial != null && partial !== '') {
                str += '.' + partial;
            }
        }
        return str;
    }
}



class SingletonsHolder<T> {
    singleton: T
    singletonsByKey = new Map<string, T>()
    singletonsByComplex = [] as [any[], T][]

    saveByKey(key: TSingletonKey, val) {
        if (key == null) {
            this.singleton = val;
            return;
        }
        if (typeof key === 'string') {
            this.singletonsByKey.set(key, val);
            return;
        }
        this.singletonsByComplex.push([key, val]);
    }
    getByKey (key: TSingletonKey): T {
        if (key == null) {
            return this.singleton;
        }
        if (typeof key === 'string') {
            return this.singletonsByKey.get(key);
        }
        let arrSingles = this.singletonsByComplex;
        let keyArr = key;

        outer: for (let i = 0; i < arrSingles.length; i++) {
            let [ checkKey, val ] = arrSingles[i];
            if (checkKey.length !== keyArr.length) {
                continue;
            }
            for (let j = 0; j < keyArr.length; j++) {
                if (keyArr[j] !== checkKey[j]) {
                    continue outer;
                }
            }
            return val;
        }
        return null;
    }

    createKey (args: any[]): TSingletonKey {
        if (args == null || args.length === 0) {
            return null;
        }

        let key: string;
        let arr: any[];
        let isComplex = false;

        for (let i = 0; i < args.length; i++) {
            let val = args[i] ?? '';
            if (isComplex) {
                arr.push(val);
                continue;
            }

            if (val instanceof Date) {
                val = val.getTime();
            }

            if (typeof val === 'function') {
                continue;
            }
            if (typeof val !== 'object') {
                key = key == null ? String(val) : `${key}.${val}`;
                continue;
            }


            if (Array.isArray(val) || val.constructor === Object || val.constructor == null) {
                // Simple object?
                let objectKey = ToKey.toKey(val);
                if (objectKey != null) {
                    key = key == null ? String(objectKey) : `${key}.${objectKey}`;
                    continue;
                }
            }

            isComplex = true;

            arr = key == null ? [val] : [ key, val ];
        }
        return isComplex ? arr : key;
    }
}

namespace ToKey {
    const MAX_DEEP = 3;
    const MAX_ARR_LENGTH = 50;
    function fromObject (obj: { [key: string]: any } | any[], level: number = 0) {
        if (level > MAX_DEEP) {
            return null;
        }

        let key = '';
        for (let prop in obj) {
            let val = obj[prop];
            if (val == null || typeof val === 'function') {
                continue;
            }
            let nextKey = toKey(val, level)
            if (nextKey == null) {
                return null;
            }

            key = key === '' ? nextKey : `${key}.${nextKey}`;
        }
        return key;
    }
    function fromArray (arr: any[], level: number = 0) {
        if (level > MAX_DEEP || arr?.length > MAX_ARR_LENGTH) {
            return null;
        }
        if (arr.length === 0) {
            return '';
        }
        let key = null;
        for (let i = 0; i < arr.length; i++) {
            let nextKey = toKey(arr[i], level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : `${key}.${nextKey}`;
        }
        return key;
    }

    export function toKey (mix: any, level: number = 0) {
        if (level > MAX_DEEP) {
            return null;
        }
        if (mix == null || typeof mix === 'function') {
            return '';
        }
        if (typeof mix !== 'object') {
            return String(mix);
        }
        if (mix instanceof Date) {
            return String(mix.getTime());
        }
        if (mix instanceof RegExp) {
            return mix.toString();
        }

        if (Array.isArray(mix)) {
            return fromArray(mix, level + 1);
        }
        return fromObject(mix, level + 1);
    }
}
