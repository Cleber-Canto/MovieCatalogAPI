module.exports = {
    displayName: 'server-unit',
    rootDir: './../../',
    testMatch: [
      '<rootDir>/src/server/**/__tests__/**/*.unit.{js,ts}',
    ],
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
  };
  