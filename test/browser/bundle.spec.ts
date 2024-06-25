import * as diContainer from '../../lib/umd/di.js';

declare var di;

UTest({
    'ensure in global' () {

        eq_(typeof diContainer, 'object');
        eq_(typeof diContainer.resolve, 'function');
        eq_(typeof diContainer.new, 'function');
    }
})
