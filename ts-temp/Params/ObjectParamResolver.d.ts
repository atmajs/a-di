import { IParamResolver } from './IParamResolver';
export declare class ObjectParamResolver implements IParamResolver {
    entries: any;
    object: any;
    constructor(di: any, object: any);
    resolve(currentParam: any): any;
}
