export default {
  preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
  transformIgnorePatterns: [
    "node_modules/(?!axios)&(?!vee-validate/dist/rules)",
  ],
  // setupFilesAfterEnv: ["<rootDir>/tests/router-mock-setup.js"],

  transform: {
    "vee-validate/dist/rules": "babel-jest",
  },
};
