import { test } from "@playwright/test";
import { expect } from "./locator.expect";


test.describe("Custom web first assertion", () => {
  test("input max length", async ({ page }) => {
    await page.goto("/practice/not-present-elements-1.html");


    // Arrange:
    const inputTestId = "dti-input";
    const inputLocator = page.getByTestId(inputTestId);
    const expectedLength = 64;


    // Assert:
    await expect(inputLocator).toHaveAttribute(
      "maxlength",
      String(expectedLength),
    );
  });


  test("input max length (custom expect)", async ({ page }) => {
    await page.goto("/practice/not-present-elements-1.html");


    // Arrange:
    const inputTestId = "dti-input";
    const inputLocator = page.getByTestId(inputTestId);
    const expectedLength = 64;


    // Assert:
    await expect(inputLocator).toHaveMaxLength(expectedLength);
  });
});