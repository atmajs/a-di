import { BaseMethodEntry } from './BaseMethodEntry';
import { IType } from './IType';
import { Di } from '../Di';
export declare class TypeEntry<T = any> extends BaseMethodEntry {
    Type: IType<T>;
    protected _singleton: T;
    constructor(di: Di, Type: IType);
    Entry(): IType<T>;
    resolve(...args: any[]): T;
    wrap(): (...args: any[]) => T;
}
