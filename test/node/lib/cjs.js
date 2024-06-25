const di = require('../../../lib/umd/di.js');

class Foo {
    getFoo () {
        return 'Foo'
    }
}

const f = di.resolve(Foo);
console.log(`Foo: ${f.getFoo()}`);

module.exports = Foo;
