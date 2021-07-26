import { BaseMethodEntry } from './BaseMethodEntry';
import { IType } from './IType';
import { Di } from '../Di';
export declare class TypeEntry<T = any> extends BaseMethodEntry {
    Type: IType<T>;
    private _holder;
    constructor(di: Di, Type: IType<T>);
    Entry(): IType<T>;
    resolve(...args: any[]): T;
    wrap<TOut = T>(): TOut;
}
export declare namespace Args {
    function getKey(args: any[], level?: number): string;
}
