module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  unmockedModulePathPatterns: ['<rootDir>/node_modules/nock'],
};
