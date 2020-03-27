import { EntryCollection } from './Entries/EntryCollection';
import { MetaReader } from './Entries/MetaReader';
import { TypeEntry } from './Entries/TypeEntry';
import { FnEntry } from './Entries/FnEntry';
import { ObjectEntry } from './Entries/ObjectEntry';
import { IType } from './Entries/IType';
export declare class Di {
    parent: Di;
    static Di: typeof Di;
    static di: Di;
    static default: Di;
    default: this;
    entries: EntryCollection;
    metaReader: MetaReader;
    constructor(parent?: Di);
    new(): Di;
    registerType(Type: IType): TypeEntry<any>;
    registerFactory(Fn: any): FnEntry<any>;
    Type(Type: IType): TypeEntry<any>;
    Function<T extends Function>(fn: T): FnEntry<T>;
    Object(object: any): ObjectEntry;
    resolve<T extends new (...args: any) => any>(mix: string | IType<T>, ...args: ConstructorParameters<T>): T;
    wrapType(Type: any): void;
}
