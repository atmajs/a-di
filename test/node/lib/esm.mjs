import di from '../../../lib/esm/di.mjs';

class Foo {
    getFoo () {
        return 'Foo'
    }
}

const f = di.resolve(Foo);
console.log(`Foo: ${f.getFoo()}`);

export { Foo }
