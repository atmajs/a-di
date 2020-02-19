import { IParamResolver } from './IParamResolver';
import { Di } from '../Di';
import { IType } from '../Entries/IType';
import { Entry } from '../Entries/Entry';


export class BaseParamResolver implements IParamResolver{
    
    entry: Entry
    
	constructor (di: Di, mix: string | IType) {
		this.entry = di.entries.getFor(mix, true);
	}

	resolve (currentParam) {
		if (currentParam != null) {
			return currentParam;
		}
		return this.entry.resolve();
	}
};