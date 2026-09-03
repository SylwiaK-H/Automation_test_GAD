import { defineConfig, devices } from "@playwright/test";
import path from "path";

export const SESSION_PATH = path.join(__dirname, "./.auth/session.json");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on",
    // testIdAttribute: "pw-test",
  },

  projects: [
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: SESSION_PATH },
      dependencies: ["setup"],
    },
  ],
});
