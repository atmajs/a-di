import { EmptyParamResolver } from './EmptyParamResolver';
import { ObjectParamResolver } from './ObjectParamResolver';
import { BaseParamResolver } from './BaseParamResolver';
export declare const ParamResolver: {
    create(di: any, mix: any): EmptyParamResolver | ObjectParamResolver | BaseParamResolver;
    createMany(di: any, arr: any): any[];
};
