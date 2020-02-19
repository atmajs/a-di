import { Entry } from './Entry';
import { IType } from './IType';
export declare class BaseMethodEntry extends Entry {
    constructor(di: any, Entry: Function | IType);
    withParams(...args: any[]): this;
    getParams_(...args: any[]): any[];
}
