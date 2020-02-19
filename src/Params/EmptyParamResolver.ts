import { IParamResolver } from './IParamResolver';

export class EmptyParamResolver implements IParamResolver {
	resolve(current) {
		return current;
	}
};