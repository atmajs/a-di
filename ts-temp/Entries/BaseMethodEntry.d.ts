import { Entry } from './Entry';
import { IType } from './IType';
import { Di } from '../Di';
export declare abstract class BaseMethodEntry extends Entry {
    constructor(di: Di, Entry: Function | IType);
    withParams(...args: any[]): this;
    getParams_(...args: any[]): any[];
}
