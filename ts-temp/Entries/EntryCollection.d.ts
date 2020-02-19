import { Entry } from './Entry';
import { TypeEntry } from './TypeEntry';
import { Di } from '../Di';
import { IType } from './IType';
export declare class EntryCollection {
    private di;
    protected arr: Entry[];
    protected ids: {};
    protected types: {};
    constructor(di: Di);
    add(entry: Entry): void;
    resolve<T>(mix: string | IType<T>): T;
    getByType<T>(Type: IType<T>): TypeEntry<T>;
    getFor(mix: any, required?: boolean): any;
    getForType(Type: any): Entry;
    removeForType(Type: any): void;
    removeFor(mix: any): void;
    registerFor(mix: any, entry: any): void;
}
