import { Di } from '../../src/Di';

var di:Di = null;

class IFoo { }
class Foo { }
class Bar {
    constructor(public foo) {
        
    }
}
class Qux {
    bar;
    test;
    constructor(options) {
        this.bar = options.bar;
        this.test = options.test;
    }
}

UTest({
    'should test Types with dependencies in `using`': {
        $before() {
            di = new Di;
        },
        'should resolve dependency'() {
            class SingleBar { }
            
            var bar = di.resolve(SingleBar);
            is_(bar, SingleBar);

            var bar2 = di.resolve(SingleBar);
            eq_(bar2, bar);

            class NotSingleBar { }
            di
                .registerType(NotSingleBar)
                .isSingleton(false);

            var notSingleBar = di.resolve(NotSingleBar);
            is_(notSingleBar, NotSingleBar);

            var notSingleBar2 = di.resolve(NotSingleBar);
            notEq_(notSingleBar2, notSingleBar);
        },
        'should resolve singleton'() {
            di
                .registerType(Foo)
                .as(IFoo);

            var foo = di.resolve(IFoo);
            is_(foo, Foo);
        },
        'should inject dependency'() {
            di
                .registerType(Bar)
                .using(IFoo)
                .asSelf();

            var bar = di.resolve(Bar);
            is_(bar, Bar);
            is_(bar.foo, Foo);
        },
        'should inject dependencies into a method'() {
            var fn = di
                .Function(assert.await(function (foo, bar) {
                    is_(foo, Foo);
                    is_(bar, Bar);
                    is_(bar.foo, Foo);
                }))
                .using(IFoo, Bar)
                .wrap();

            fn();
        },
        'should inject arguments property'() {
            di
                .registerType(Qux)
                .using({ bar: Bar })
                .asSelf();

            var WrappedQux = di.wrapType(Qux);
            var qux = new WrappedQux({ test: 1 });
            eq_(qux.test, 1);
            is_(qux.bar, Bar);
            is_(qux.bar.foo, Foo);
        },
        'should instantiate not registered type'() {
            class Test {
                constructor(public bar) {
                }
            }
            var test = di
                .Type(Test)
                .using(Bar)
                .resolve();

            is_(test.bar, Bar);
            is_(test.bar.foo, Foo);
        },
        'should pre-define parameter'() {
            class Test {
                constructor(public bar, public num) {
                    
                }
            }
            var entry = di
                .Type(Test)
                .using(Bar)
                .isSingleton(false)
                .withParams(null, 10);

            var a = entry.resolve();
            is_(a.bar, Bar);
            eq_(a.num, 10);

            '> should override parameter'
            var b = entry.resolve(null, 11);
            is_(b.bar, Bar);
            eq_(b.num, 11);
        }

    },
    'should test Types with dependencies in meta declaration': {
        $before() {
            di = new Di;
        },

        'should inject dependency'() {
            class Foo { }
            class Bar {
                constructor(public foo) {
                    
                }
                static get $constructor() {
                    return [Foo]
                }
            };
            di.registerType(Foo).asSelf();
            di.registerType(Bar).asSelf();

            var bar = di.resolve(Bar);
            is_(bar, Bar);
            is_(bar.foo, Foo);
        },
        'should instantiate not registered type'() {
            class Qux { }
            class Test {
                constructor(public qux) {
                    
                }
                static get $constructor() {
                    return [Qux];
                }
            }

            di.registerType(Qux).asSelf();

            var test = di
                .Type(Test)
                .resolve();

            is_(test.qux, Qux);
        }
    },
    'should resolve type when not registered'() {
        class Foo { };
        const foo = di.resolve(Foo);
        eq_(foo instanceof Foo, true);

        class Bar { }

        di.registerType(Bar).as(Foo).asSelf();
        const bar = di.resolve(Foo);
        eq_(bar instanceof Bar, true);
    },

})