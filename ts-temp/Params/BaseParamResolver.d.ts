import { IParamResolver } from './IParamResolver';
import { Di } from '../Di';
import { IType } from '../Entries/IType';
import { Entry } from '../Entries/Entry';
export declare class BaseParamResolver implements IParamResolver {
    entry: Entry;
    constructor(di: Di, mix: string | IType);
    resolve(currentParam: any): any;
}
