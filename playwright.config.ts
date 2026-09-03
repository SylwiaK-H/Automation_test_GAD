import { defineConfig, devices } from "@playwright/test";
import path from "path";

export const STORAGE_STATE_CREATOR = path.join(
  __dirname,
  ".auth/session_creator.json",
);
export const STORAGE_STATE_VIEWER = path.join(
  __dirname,
  ".auth/session_viewer.json",
);

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
      name: "chromium-logged-user-creator",
      grep: /@creator/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_CREATOR,
      },
      dependencies: ["setup"],
    },
    {
      name: "chromium-logged-user-viewer",
      grep: /@viewer/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_VIEWER,
      },
      dependencies: ["setup"],
    },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },
  ],
});
