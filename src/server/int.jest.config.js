module.exports = {
    displayName: 'server-int',
    rootDir: './../../',
    testMatch: [
      '<rootDir>/src/server/**/__tests__/**/*.int.{js,ts}',
    ],
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
  };
  