import * as diContainer from '../../lib/di.js';
debugger;
declare var di;

UTest({
    'ensure in global' () {
        eq_(typeof di, 'object');
        eq_(typeof di.resolve, 'function');
        eq_(typeof di.new, 'function');

        eq_(typeof diContainer, 'object');
        eq_(typeof diContainer.resolve, 'function');
        eq_(typeof diContainer.new, 'function');
    }
})