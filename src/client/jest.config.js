module.exports = {
    displayName: 'client',
    rootDir: './../../',
    testMatch: [
      '<rootDir>/src/client/**/__tests__/**/*.spec.{js,jsx,ts,tsx}',
    ],
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jest-environment-jsdom',
  };
  