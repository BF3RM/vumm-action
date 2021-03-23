module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    setupFiles: [
        "<rootDir>/src/setup_tests.ts"
    ],
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    testRunner: 'jest-circus/runner',
    testTimeout: 10000,
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    verbose: false
  }