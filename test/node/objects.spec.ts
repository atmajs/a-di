import { Di } from '../../src/Di';
import sinon = require('sinon');

var di:Di = null;


UTest({
    'should register Object as singleton for a Type': {
        $before() {
            di = new Di;
        },
        'should resolve dependency'() {
            const spy = sinon.spy();
            class SingleBar {
                constructor () {
                    spy();
                }
            }
            
            const singleton = new SingleBar();
            di
                .Object(singleton)
                .as(SingleBar);
            
            eq_(spy.callCount, 1);

            let bar1 = di.resolve(SingleBar);
            eq_(bar1, singleton);

            eq_(spy.callCount, 1);
        }
    },
    
})