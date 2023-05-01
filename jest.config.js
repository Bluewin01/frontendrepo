module.exports = {
  displayName: {
    name: "Notification Template Web",
    color: "greenBright",
  },

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  roots: ["<rootDir>/src"],

  collectCoverage: true,

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/public/",
    "/src/services/*Worker.js",
  ],

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/public/",
    "compression.js",
    "storage.js",
    "testing-utils.js",
    "/ck-editor/",
    "./lib",
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json", "lcov", "text", "clover", "cobertura"],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },

  // An array of regexp pattern strings,
  // matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: ["lib"],

  // Use this configuration option to add custom reporters to Jest
  reporters: ["default", "jest-junit"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // This option allows the use of a custom results processor
  testResultsProcessor: "jest-junit",

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  moduleNameMapper: {
    "\\.(css|scss|less|sss)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(png|PNG|svg|pdf|jpg|jpeg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },

  globals: {
    __ENV__: "local",
  },

  setupFiles: ["<rootDir>/test-setup.js"],
};
