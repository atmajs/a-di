import { BaseMethodEntry } from './BaseMethodEntry';
export declare class FnEntry<T extends Function> extends BaseMethodEntry {
    Fn: T;
    constructor(di: any, fn: T);
    Entry(): any;
    resolve(...args: any[]): any;
    wrap<TOut = T>(): TOut;
}
