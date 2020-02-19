import { Is } from '../utils/is'
import { EmptyParamResolver } from './EmptyParamResolver';
import { ObjectParamResolver } from './ObjectParamResolver';
import { BaseParamResolver } from './BaseParamResolver';

export const ParamResolver = {

    create(di, mix) {
        if (mix == null) {
            return new EmptyParamResolver();
        }
        if (Is.Object(mix)) {
            return new ObjectParamResolver(di, mix);
        }
        return new BaseParamResolver(di, mix);
    },

    createMany(di, arr) {
        var out = new Array(arr.length),
            i = arr.length;
        while (--i !== -1) {
            out[i] = ParamResolver.create(di, arr[i]);
        }
        return out;
    }
};
