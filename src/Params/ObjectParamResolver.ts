import { IParamResolver } from './IParamResolver';
import { Is } from '../utils/is';

export class ObjectParamResolver implements IParamResolver {
    
    entries: any
    object: any

	constructor (di, object) {
		this.object = object;
		this.entries = di.entries;
	}

	resolve (currentParam) {
		if (currentParam !== null && Is.Object(currentParam) === false) {
			throw new Error('Object is expected to extend the resultig one')
		}

		var out = Object.create(this.object);
		for(var key in out) {
			out[key] = this.entries.resolve(out[key]);
		}
		for (var key in currentParam) {
			out[key] = currentParam[key];
		}		
		return out;
	}
}