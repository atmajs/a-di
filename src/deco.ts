import { Di } from './Di';
import { IType } from './Entries/IType';
import { TypeMeta } from './TypeMeta';

interface IConstructorParam {
    Type?: IType

    /** Type singleton will be based on such parameter values */
    singleton?: boolean
}

export function deco_param (opts: IConstructorParam)
export function deco_param (Type: IType | any)
export function deco_param (mix: any) {
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

export function deco_for (Type: IType | any)
export function deco_for (mix: any) {
    let di = this as Di;

    return function (target) {
        di.registerType(target).as(mix);
        return target;
    };
}
