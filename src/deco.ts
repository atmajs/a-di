import { IType } from './Entries/IType';
import { TypeMeta } from './TypeMeta';

interface IConstructorParam {
    Type?: IType

    /** Type singleton will be based on such parameter values */
    singleton?: boolean
}

export function deco_param (opts: IConstructorParam)
export function deco_param (Type: IType)
export function deco_param (mix) {
    let opts: IConstructorParam;
    if (mix == null) {
        opts = {};
    } else if (typeof mix === 'function') {
        opts = {
            Type: mix
        }
    } else if (typeof mix === 'object') {
        opts = mix;
    }
    return function (target, propertyKey, index) {
        TypeMeta.defineParam(target, opts, index);
    };
}
