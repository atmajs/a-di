import { Entry } from './Entry';
import { Di } from '../Di';
export declare class ObjectEntry extends Entry {
    Object: any;
    resolvers: any[];
    constructor(di: Di, object: any);
    using(objectDefinitions: any): this;
    resolve(currentObject?: any): any;
    wrap(): any;
    Entry(): any;
}
