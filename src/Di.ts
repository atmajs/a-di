import { EntryCollection } from './Entries/EntryCollection';
import { MetaReader } from './Entries/MetaReader';
import { TypeEntry } from './Entries/TypeEntry';
import { FnEntry } from './Entries/FnEntry';
import { ObjectEntry } from './Entries/ObjectEntry';
import { IType } from './Entries/IType';
import { deco_param } from './deco';

type OptionalConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? Partial<P> : never;

export class Di {

    static Di = Di
    static di = new Di
    static default = Di.di

    default = this
    di = this;

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

    Type(Type: IType): TypeEntry {
        return new TypeEntry(this, Type);
    }

    Function <T extends Function> (fn: T) {
        return new FnEntry<T>(this, fn);
    }

    Object(object) {
        return new ObjectEntry(this, object);
    }

    resolve <T extends new (...args) => any> (mix: string | T, ...args: OptionalConstructorParameters<T>): InstanceType<T> {
        return this.entries.resolve(mix, ...args);
    }

    wrapType<T> (Type: T): T {
        return this.entries.getFor(Type).wrap();
    }

    static param = deco_param;
    param = deco_param;

};
