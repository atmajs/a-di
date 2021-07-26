import { Di } from '../Di';
import { ITypeMeta } from '../TypeMeta';
export declare abstract class Entry {
    di: Di;
    protected _as: any[];
    protected _using: any[];
    protected _params: any[];
    protected _resolvers: any[];
    protected _meta: ITypeMeta;
    cfg_arguments: string;
    cfg_singleton: boolean;
    onActivatedCb: any;
    constructor(di: Di);
    config(key: 'arguments', value: 'override' | 'ignore' | 'extend'): any;
    config(key: 'singleton', value: boolean | 'arguments'): any;
    using(...args: any[]): this;
    isSingleton(val?: boolean): this;
    for(...args: any[]): this;
    as(...args: any[]): this;
    register(): this;
    asSelf(): this;
    resolve(...args: any[]): any;
    onActivated(fn: any): void;
    Entry(): any;
    abstract wrap<T = any>(): T;
}
