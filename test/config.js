module.exports = {
	suites: {
		'dom': {
			exec: 'dom',
			env: [ '/lib/di.js' ],
			tests: 'test/dom/**',
		}
	}
}