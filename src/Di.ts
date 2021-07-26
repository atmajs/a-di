import { EntryCollection } from './Entries/EntryCollection';
import { MetaReader } from './Entries/MetaReader';
import { TypeEntry } from './Entries/TypeEntry';
import { FnEntry } from './Entries/FnEntry';
import { ObjectEntry } from './Entries/ObjectEntry';
import { IType } from './Entries/IType';
import { deco_for, deco_param } from './deco';

type OptionalConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? Partial<P> : never;

export class Di {

    /** Container for registered Types */
    entries = new EntryCollection(this);

    /** Reader to get meta information from a Type */
    metaReader = new MetaReader();

    /**
     * @param parent Optionaly pass the parent container
     */
    constructor(public parent: Di = null) {

    }

    /** Create new Di scope using current di as the parent container */
    new () {
        return new Di(this);
    }

    /**
     * Create and register a Type: create mapping, aliases, etc
     * Example: `di.registerType(Foo).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the registration flow
     */
    registerType(Type: IType) {
        return this.Type(Type).register();
    }

    /**
     * Manually start registering a Type Factory
     * Example: `di.registerFactory(di => { return SomeInstance; }).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the configuration flow
     */
    registerFactory(Fn) {
        return this.Factory(Fn).register();
    }

    /**
     * Creates a Type, same as `registerType` but doesn't register within this Di context
     */
    Type(Type: IType): TypeEntry {
        return new TypeEntry(this, Type);
    }

    Factory <T extends Function> (fn: T) {
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

    /** Alias for `inject`*/
    static param = deco_param;
    /** Alias for `inject`*/
    param = deco_param;

    static inject = deco_param;
    inject = deco_param;

    //static for = deco_for;
    /**
     * Class Decorator to specify for which type is this implementation
     * ```
     * @di.for(AFoo)
     * class Foo {}
     * ```
     */
    for = deco_for;


    /** Supports import { Di } from 'a-di' */
    static Di = Di
    /** Supports import { di } from 'a-di' */
    static di = new Di
    /** Supports import di from 'a-di' */
    static default = Di.di
    /** Supports import di from 'a-di' */
    default = this
    /** Supports import {  di } from 'a-di' */
    di = this;
};
