import { test, expect } from "@playwright/test";
import {
  STORAGE_STATE_CREATOR,
  STORAGE_STATE_VIEWER,
} from "../playwright.config";


test.describe("Setup session", () => {
  test("authenticate creator", async ({ page }) => {
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
    await page.context().storageState({ path: STORAGE_STATE_CREATOR });
  });


  test("authenticate viewer", async ({ page }) => {
    // Arrange:
    const userName = "Danial.Dicki@dicki.test";
    const password = "test2";


    await page.goto("/login/");


    // Act:
    await page.locator('[name="username"]').fill(userName);
    await page.locator("#password").fill(password);
    await page.locator("#loginButton").click();


    // Assert:
    await expect(page.getByTestId("hello")).toBeVisible();
    await page.context().storageState({ path: STORAGE_STATE_VIEWER });
  });
});