import { Entry } from './Entry';
import { TypeEntry } from './TypeEntry';
import { Di } from '../Di'
import { IType } from './IType';

export class EntryCollection {
    protected arr: Entry[] = [];
    protected ids: { [key: string]: Entry } = {};
    protected types = {};

    constructor(private di: Di) {

    }

    add (entry: Entry) {
        this.arr.push(entry);
    }

    resolve <T> (mix: string | IType<T>, ...args): T {
        if (mix == null) {
            throw new Error('Resolve argument is undefined');
        }

        let entry: Entry = null;
        if (typeof mix === 'string') {
            entry = this.ids[mix];
            if (entry == null) {
                throw Error(`Entry for Type '${mix}' not found`)
            }
        }
        if (typeof mix === 'function') {
            entry = this.getForType(mix);
            if (entry == null) {
                entry = new TypeEntry(this.di, mix);
                this.registerFor(mix, entry);
            }
        }
        return entry.resolve(...args);
    }

    getByType<T> (Type: IType<T>): TypeEntry<T> {
        let arr = this.arr;
        let i = arr.length;
        while (--i > -1) {
            let x = arr[i];
            if ((x as any).Type === Type) {
                return x as TypeEntry<T>;
            }
        }
        return null;
    }

    getFor(mix, required = false) {
        if (typeof mix === 'string') {
            var entry = this.ids[mix];
            if (required === true && entry == null) {
                throw Error(`Dependency is not registered "${mix}"`);
            }
            return entry;
        }
        if (typeof mix === 'function') {
            var entry = this.getForType(mix);
            if (required === true && entry == null) {
                throw Error(`Dependency is not registered "${mix.name}"`);
            }
            return entry;
        }
        throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
    }

    getForType(Type): Entry {
        let name = Type.name;
        let arr = this.types[name];
        if (arr != null) {
            let i = arr.length;
            while (--i > -1) {
                var x = arr[i];
                if (x.Type === Type) {
                    return x.entry;
                }
            }
        }
        return this.di.parent?.entries.getForType(Type);
    }

    removeForType(Type) {
        var arr = this.types[Type.name];
        if (arr == null) {
            return;
        }
        let imax = arr.length,
            i = -1;
        while (++i < imax) {
            var x = arr[i];
            if (x.Type === Type) {
                arr.splice(i, 1);
                return;
            }
        }
    }

    removeFor(mix) {
        if (typeof mix === 'string') {
            this.ids[mix] = null;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                return;
            }
            var i = arr.length;
            while (--i !== -1) {
                if (arr[i].Type === mix) {
                    arr.splice(i, 1);
                }
            }
            return;
        }
    }

    removeAll () {
        this.types = {};
        this.arr = [];
    }

    registerFor(mix, entry: Entry) {
        if (typeof mix === 'string') {
            this.ids[mix] = entry;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                arr = this.types[name] = [];
            }
            arr.push({
                Type: mix,
                entry: entry
            });
            return;
        }
        throw Error('Collection::registerFor. Unsupported value type: ' + (typeof mix));
    }

};
