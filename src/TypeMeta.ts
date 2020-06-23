import { IType } from './Entries/IType';

export interface IConstructorParam {
    Type?: IType

    /** Type singleton will be based on such parameter values */
    singleton?: boolean
}
export interface ITypeMeta {
    params: IConstructorParam[]

    hasSingletonParams: boolean
}


export namespace TypeMeta {
    const map = new Map();

    export function defineParam (Ctor, opts: IConstructorParam, index: number) {
        const meta = ensureMeta(Ctor);
        meta.params[index] = opts;
    }

    function pickMeta(Ctor): ITypeMeta {
        return map.get(Ctor);
    }
    function ensureMeta(Ctor): ITypeMeta {
        let current = map.get(Ctor);
        if (current == null) {
            current = { params: [] };
            map.set(Ctor, current);
        }
        return current;
    }

    export function prepairMeta(Ctor): ITypeMeta {
        let meta = ensureMeta(Ctor);
        meta.hasSingletonParams = meta.params.some(x => x?.singleton);

        return meta;
    }
}
