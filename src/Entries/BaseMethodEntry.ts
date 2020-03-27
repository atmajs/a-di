import { Entry } from './Entry';
import { Opts } from '../const';
import { IType } from './IType';

export class BaseMethodEntry extends Entry {

    constructor(di, Entry: Function | IType) {
        super(di);

        if (typeof Entry !== 'function') {
            throw new Error('Invalid argument. Function expected');
        }

        let using = di.metaReader.readFromType(Entry);
        if (using != null) {
            this.using.apply(this, using);
        }
    }

    withParams(...args) {
        this._params = args;
        return this;
    }

    getParams_(...args) {
        let resolvers = this._resolvers,
            params = this._params;


        var argsIgnore = this.cfg_arguments === Opts.args.IGNORE,
            argsExtend = this.cfg_arguments === Opts.args.EXTEND,
            argsOverride = this.cfg_arguments === Opts.args.OVERRIDE;

        var size = resolvers.length;
        if (size < params.length) size = params.length;
        if (argsIgnore === false) {
            if (argsExtend) {
                size += args.length;
            }
            if (argsOverride && args.length > size) {
                size = args.length;
            }
        }

        var ctorParams = new Array(size);
        var i = -1;
        while (++i < size) {

            if (i < params.length && params[i] != null) {
                var arg = argsIgnore === false && i < args.length && args[i] != null
                    ? args[i]
                    : params[i];
                ctorParams[i] = arg;
                continue;
            }
            if (i < resolvers.length && resolvers[i] != null) {
                var arg = argsIgnore === false && i < args.length
                    ? args[i]
                    : void 0;
                ctorParams[i] = resolvers[i].resolve(arg);
                continue;
            }
            if (argsIgnore) {
                continue;
            }
            if (argsOverride && i < args.length) {
                ctorParams[i] = args[i];
                continue;
            }
            if (argsExtend && i >= size - args.length) {
                var j = i - size - args.length;
                ctorParams[i] = args[j];
                continue;
            }
        }

        let Fn = this.Entry();
        let expect = Fn.length;
        if (expect > size) {
            throw new Error(`Not enough arguments for Method ${Fn.name}. Got ${size}. Expect ${expect}`);
        }

        return ctorParams;
    }
};