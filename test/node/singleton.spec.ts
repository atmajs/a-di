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

    }

})
