import { test, expect } from "@playwright/test";

test.describe("welcome page tests - creator", { tag: ["@creator"] }, () => {
  test("user account", async ({ page }) => {
    // Arrange:
    const helloHeaderLocator = page.getByTestId("hello");

    await page.goto("/welcome/");

    // Assert:
    await expect(helloHeaderLocator).toBeVisible();
    await expect(helloHeaderLocator).toHaveText("Hi Moses.Armstrong@Feest.ca!");
  });
});
