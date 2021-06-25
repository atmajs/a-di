import { Di } from '../../src/Di';

var di:Di = null;


UTest({
    $before() {
        di = new Di;
    },

    'singleton' () {
        class Foo {
            constructor (public bar: string) {

            }
        }

        let f1 = di.resolve(Foo, 'b1');
        eq_(f1.bar, 'b1');

        let f2 = di.resolve(Foo, 'b2');
        eq_(f2.bar, 'b2');

    },

    'singleton by class' () {

        class Bar {}
        class Foo {
            constructor (public inner: Bar) {

            }
        }

        let f1 = di.resolve(Foo, di.resolve(Bar));
        let f2 = di.resolve(Foo, di.resolve(Bar));

        eq_(f1.inner, f2.inner);
        eq_(f1, f2);


        let f3 = di.resolve(Foo, new Bar());
        notEq_(f1, f3);
    },
    'singleton by data object' () {
        class Foo {
            constructor (public opts) {}
        }
        let f1 = di.resolve(Foo, { name: 'bar'} );
        let f2 = di.resolve(Foo, { name: 'bar'} );
        eq_(f1, f2);
        let f3 = di.resolve(Foo, { name: 'qux' });
        notEq_(f1, f3);
    },
    'singleton by nested object' () {
        class Foo {
            constructor (public opts) {}
        }
        let f1 = di.resolve(Foo, { user: { age:  20 } });
        let f2 = di.resolve(Foo, { user: { age:  20 } });
        eq_(f1, f2);
        let f3 = di.resolve(Foo, { user: { age:  21 } });
        notEq_(f1, f3);
    },
    'singleton by array' () {
        class Foo {
            constructor (public opts) {}
        }
        let f1 = di.resolve(Foo, [1, 'foo']);
        let f2 = di.resolve(Foo, [1, 'foo']);
        eq_(f1, f2);
        let f3 = di.resolve(Foo, [1, 'foo', 3]);
        notEq_(f1, f3);
    }

})
