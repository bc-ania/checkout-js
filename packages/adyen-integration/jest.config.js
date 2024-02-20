module.exports = {
    displayName: 'adyen-integration',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            diagnostics: false,
        },
    },
    setupFilesAfterEnv: ['../../jest-setup.ts'],
    coverageDirectory: '../../coverage/packages/adyen-integration',
    testPathIgnorePatterns: ['/adyenv2/e2e/', '/adyenv3/e2e/'],
};
