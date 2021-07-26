import { EntryCollection } from './Entries/EntryCollection';
import { MetaReader } from './Entries/MetaReader';
import { TypeEntry } from './Entries/TypeEntry';
import { FnEntry } from './Entries/FnEntry';
import { ObjectEntry } from './Entries/ObjectEntry';
import { IType } from './Entries/IType';
import { deco_for, deco_param } from './deco';
declare type OptionalConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? Partial<P> : never;
export declare class Di {
    parent: Di;
    /** Container for registered Types */
    entries: EntryCollection;
    /** Reader to get meta information from a Type */
    metaReader: MetaReader;
    /**
     * @param parent Optionaly pass the parent container
     */
    constructor(parent?: Di);
    /** Create new Di scope using current di as the parent container */
    new(): Di;
    /**
     * Create and register a Type: create mapping, aliases, etc
     * Example: `di.registerType(Foo).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the registration flow
     */
    registerType(Type: IType): TypeEntry<any>;
    /**
     * Manually start registering a Type Factory
     * Example: `di.registerFactory(di => { return SomeInstance; }).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the configuration flow
     */
    registerFactory(Fn: any): FnEntry<any>;
    /**
     * Creates a Type, same as `registerType` but doesn't register within this Di context
     */
    Type(Type: IType): TypeEntry;
    Factory<T extends Function>(fn: T): FnEntry<T>;
    Object(object: any): ObjectEntry;
    resolve<T extends new (...args: any[]) => any>(mix: string | T, ...args: OptionalConstructorParameters<T>): InstanceType<T>;
    wrapType<T>(Type: T): T;
    /** Alias for `inject`*/
    static param: typeof deco_param;
    /** Alias for `inject`*/
    param: typeof deco_param;
    static inject: typeof deco_param;
    inject: typeof deco_param;
    /**
     * Class Decorator to specify for which type is this implementation
     * ```
     * @di.for(AFoo)
     * class Foo {}
     * ```
     */
    for: typeof deco_for;
    /** Supports import { Di } from 'a-di' */
    static Di: typeof Di;
    /** Supports import { di } from 'a-di' */
    static di: Di;
    /** Supports import di from 'a-di' */
    static default: Di;
    /** Supports import di from 'a-di' */
    default: this;
    /** Supports import {  di } from 'a-di' */
    di: this;
}
export {};
