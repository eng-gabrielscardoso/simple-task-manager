import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
};

export default config
