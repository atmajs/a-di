import { BaseMethodEntry } from './BaseMethodEntry';

export class FnEntry <T extends Function> extends BaseMethodEntry {
    Fn: T

    constructor(di, fn: T) {
        super(di, fn);
        this.Fn = fn;
    }

    Entry(): any {
        return this.Fn;
    }

    resolve(...args) {
        let params = this.getParams_(...args);
        return this.Fn.apply(null, params);
    }

    wrap<TOut = T>(): TOut {
        return this.resolve.bind(this);
    }
};
