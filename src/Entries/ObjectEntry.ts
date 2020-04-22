import { Entry } from './Entry';
import { ParamResolver } from '../Params/ParamResolver';
import { Di } from '../Di';

export class ObjectEntry extends Entry {
    Object: any
    resolvers: any[]

    constructor(di: Di, object) {
        super(di);
        this.Object = object;
    }

    using(objectDefinitions) {
        if (arguments.length !== 1) {
            throw new Error('Invalid argument count in using for an ObjectEntry');
        }
        for (var key in objectDefinitions) {
            var paramResolver = ParamResolver.create(this.di, objectDefinitions[key]);
            this.resolvers.push([key, paramResolver]);
        }
        return this;
    }

    resolve(currentObject?) {
        if (this.cfg_singleton) {
            return this.Object;
        }

        var object = Object.create(this.Object);
        var arr = this.resolvers,
            i = arr.length;
        while (--i > -1) {
            var resolverEntry = this.resolvers[i];
            var key = resolverEntry[0],
                Resolver = resolverEntry[1];

            var arg = currentObject == null ? null : currentObject[key];
            var val = Resolver.resolve(arg);

            object[key] = val;
        }
        for (var name in currentObject) {
            if (object[name] == null) {
                object[name] = currentObject[name];
            }
        }
        return object;
    }

    wrap() {
        return this.resolve.bind(this);
    }

    Entry() {
        return this.Object;
    }

};