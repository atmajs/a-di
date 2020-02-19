import { BaseMethodEntry } from './BaseMethodEntry';
import { IType } from './IType';
import { Di } from '../Di';

export class TypeEntry<T = any> extends BaseMethodEntry {

    Type: IType<T>

    protected _singleton: T = null

    constructor(di: Di, Type: IType) {
        super(di, Type);
        this.Type = Type;
    }

    Entry() {
        return this.Type;
    }

    resolve (...args): T {
        if (this.cfg_singleton && this._singleton != null) {
            return this._singleton;
        }
        const params = this.getParams_(...args);
        const Ctor = this.Type;
        //new (Function.prototype.bind.apply(Ctor, [null].concat(params)))();
        const instance = new Ctor(...params) as any as T;
        if (this.cfg_singleton) {
            this._singleton = instance;
        }
        return instance;
    }

    wrap() {
        var self = this;
        return function (...args) {
            return self.resolve(...args);
        };
    }
};