import { test, expect } from "@playwright/test";
import {
  STORAGE_STATE_CREATOR,
  STORAGE_STATE_VIEWER,
} from "../playwright.config";

test.describe("welcome page tests - creator", { tag: ["@creator"] }, () => {
  test.use({ storageState: STORAGE_STATE_CREATOR });

  test("user account", async ({ page }) => {
    // Arrange:
    const helloHeaderLocator = page.getByTestId("hello");

    await page.goto("/welcome/");

    // Assert:
    await expect(helloHeaderLocator).toBeVisible();
    await expect(helloHeaderLocator).toHaveText("Hi Moses.Armstrong@Feest.ca!");
  });
});

test.describe("welcome page tests - viewer", { tag: ["@viewer"] }, () => {
  test.use({ storageState: STORAGE_STATE_VIEWER });

  test("user account", async ({ page }) => {
    // Arrange:
    const helloHeaderLocator = page.getByTestId("hello");

    await page.goto("/welcome/");

    // Assert:
    await expect(helloHeaderLocator).toBeVisible();
    await expect(helloHeaderLocator).toHaveText("Hi Danial.Dicki@dicki.test!");
  });
});
