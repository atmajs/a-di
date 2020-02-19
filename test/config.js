module.exports = {
    suites: {
        'dom': {
            exec: 'dom',
            tests: 'test/browser/**',
            $config: {
                includejs: {
                    amd: true,
                    extentionDefault: {
                        "js": "ts"
                    }
                }
            }
        },
        'node': {
            exec: 'node',
            tests: 'test/node/**',
        },
        'mask': {
            exec: 'dom',
            tests: 'test/mask/**',
            $config: {
                includejs: {
                    amd: true,
                    extentionDefault: {
                        "js": "ts"
                    }
                }
            }
        }
    }
};