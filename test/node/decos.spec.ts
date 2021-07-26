import { Di } from '../../src/Di'

const di = new Di();

UTest({
    'constructor decorator params' () {
        class Foo {
            count = 5
        }
        class Bar {
            constructor(@di.param(Foo) public foo: Foo) {}
        }

        let bar = di.resolve(Bar);
        eq_(bar.foo.count, 5);

        class Qux {
            constructor(@di.param(Bar) public bar) {}
        }

        let qux = di.resolve(Qux);
        eq_(qux.bar.foo.count, 5);

        '> resolve gets singletons per default'
        qux.bar.foo.count++;

        let foo = di.resolve(Foo);
        eq_(foo.count, 6);
        eq_(foo, bar.foo);
    },
    'constructor default params' () {
        class Foo {
            count = 5
        }
        class Bar {
            constructor(public foo = di.resolve(Foo)) {}
        }

        let bar = di.resolve(Bar);
        eq_(bar.foo.count, 5);

        class Qux {
            constructor(public bar = di.resolve(Bar)) {}
        }

        let qux = di.resolve(Qux);
        eq_(qux.bar.foo.count, 5);

        '> resolve gets singletons per default'
        qux.bar.foo.count++;

        let foo = di.resolve(Foo);
        eq_(foo.count, 6);
        eq_(foo, bar.foo);
    },
    '!constructor with deco and default params' () {
        abstract class AFoo {
            count = 5
        }

        @di.for(AFoo)
        class Foo extends AFoo {
            constructor () {
                super();
                this.count = 7;
            }
        }

        class Bar {
            constructor(@di.inject(AFoo) public foo) {}
        }

        let bar = di.resolve(Bar);
        eq_(bar.foo.count, 7);

    }
});
