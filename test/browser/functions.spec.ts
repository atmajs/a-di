import { Di } from '../../src/Di'
let di: Di = null;

class IFoo { }
class Foo { }
class Bar {
    constructor(public foo: Foo) {

    }
}
class Qux {
    bar
    test

    constructor(options) {
        this.bar = options.bar;
        this.test = options.test;
    }
}

UTest({
    $before() {
        di = new Di;
        di
            .registerType(Foo)
            .as(IFoo);

        di
            .registerType(Bar)
            .using(IFoo)
            .asSelf();
    },
    'should resolve foo' () {
        let foo = di.resolve(Foo);
        is_(foo, Foo);

        let foo2 = di.resolve(IFoo);
        is_(foo2, Foo);

        eq_(foo, foo2);
    },
    'should inject all dependencies into a method'() {
        var fn = di
            .Factory(assert.await(function (foo, bar) {
                is_(foo, Foo);
                is_(bar, Bar);
                is_(bar.foo, Foo);
            }))
            .using(IFoo, Bar)
            .wrap();

        fn();
    },

    'should override arguments'() {
        var one = {}, two = {};
        var fn = di
            .Factory(assert.await(function (foo, bar) {
                eq_(foo, one);
                eq_(bar, two)
            }))
            .using(IFoo, Bar)
            .wrap();

        fn(one, two);
    },

})
