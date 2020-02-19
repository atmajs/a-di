import { Di } from '../Di';
import { IType } from './IType';
export declare abstract class Entry {
    di: Di;
    protected _as: any[];
    protected _using: any[];
    protected _params: any[];
    protected _resolvers: any[];
    cfg_arguments: string;
    cfg_singleton: boolean;
    onActivatedCb: any;
    constructor(di: Di);
    config(key: 'arguments', value: 'override' | 'ignore' | 'extend'): any;
    config(key: 'singleton', value: boolean): any;
    using(...args: any[]): this;
    isSingleton(val?: boolean): this;
    as(...args: any[]): this;
    register(): this;
    asSelf(): this;
    resolve(mix?: string | IType): any;
    onActivated(fn: any): void;
    Entry(): any;
}
