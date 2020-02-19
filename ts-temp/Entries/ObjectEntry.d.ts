import { Entry } from './Entry';
export declare class ObjectEntry extends Entry {
    container: any;
    Object: any;
    resolvers: any[];
    constructor(container: any, object: any);
    using(objectDefinitions: any): this;
    resolve(currentObject: any): any;
    wrap(): any;
    Entry(): any;
}
