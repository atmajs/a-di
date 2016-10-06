module.exports = {
	suites: {
		'dom': {
			exec: 'dom',
			env: [ '/lib/di.js::Di' ],
			tests: 'test/bundled/**',
		},
		'node': {
			exec: 'node',
			env: [ '/lib/di.js::Di' ],
			tests: 'test/bundled/**',
		},
		'modules': {
			exec: 'node',
			tests: 'test/*.test',
		}
	}
};