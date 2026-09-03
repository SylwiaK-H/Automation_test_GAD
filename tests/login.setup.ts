import { test, expect } from "@playwright/test";
import path from "path";
import { SESSION_PATH } from "../playwright.config";


test.describe("Setup session", () => {
  test("authenticate", async ({ page }) => {
    // Arrange:
    const userName = "Moses.Armstrong@Feest.ca";
    const password = "test1";


    await page.goto("/login/");


    // Act:
    await page.locator('[name="username"]').fill(userName);
    await page.locator("#password").fill(password);
    await page.locator("#loginButton").click();


    // Assert:
    await expect(page.getByTestId("hello")).toBeVisible();
    await page.context().storageState({ path: SESSION_PATH });
  });
});