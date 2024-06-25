import { Shell } from 'shellbee'

UTest({
    async 'should load esm' () {
        let { std } = await Shell.run({
            command: 'node esm.mjs',
            cwd: './test/node/lib/',
            silent: true
        });
        eq_(std.join('').trim(), 'Foo: Foo');
    },
    async 'should load cjs' () {
        let { std } = await Shell.run({
            command: 'node cjs.js',
            cwd: './test/node/lib/',
            silent: true
        });
        eq_(std.join('').trim(), 'Foo: Foo');
    }
})
