import { EntryCollection } from './Entries/EntryCollection';
import { MetaReader } from './Entries/MetaReader';
import { TypeEntry } from './Entries/TypeEntry';
import { FnEntry } from './Entries/FnEntry';
import { ObjectEntry } from './Entries/ObjectEntry';
import { IType } from './Entries/IType';

export class Di {

    static Di = Di
    static di = new Di
    static default = Di.di
    
    default = this
    
    entries = new EntryCollection(this);
    metaReader = new MetaReader();

    constructor(public parent: Di = null) {
        
    }

    new () {
        return new Di(this);
    }

    registerType(Type: IType) {
        return this.Type(Type).register();
    }

    registerFactory(Fn) {
        return this.Function(Fn).register();
    }

    Type(Type: IType) {
        return new TypeEntry(this, Type);
    }

    Function <T extends Function> (fn: T) {
        return new FnEntry<T>(this, fn);
    }

    Object(object) {
        return new ObjectEntry(this, object);
    }

    resolve <T extends new (...args: any) => any> (mix: string | IType<T>, ...args: ConstructorParameters<T>): T {
        return this.entries.resolve(mix, ...args);
    }

    wrapType(Type) {
        return this.entries.getFor(Type).wrap();
    }
};