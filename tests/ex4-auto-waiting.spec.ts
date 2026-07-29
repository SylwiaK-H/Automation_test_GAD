import { expect, test } from "@playwright/test";

test.describe("auto wait exercises", () => {
  test("button and delayed results", async ({ page }) => {
    await page.goto("/practice/delayed-elements-and-delayed-result-1.html");

    // Arrange:
    const elementTestId = "dti-button-element-1";
    const resultsTestId = "dti-results";
    const expectedMessage = "You clicked the button!";

    const buttonLocator = page.getByTestId(elementTestId);
    const results = page.getByTestId(resultsTestId);

    // Act:
    await buttonLocator.click();

    // Assert:
    await expect(results).toHaveText(expectedMessage);
  });

  test("button and delayed results (greater delay)", async ({ page }) => {
    await page.goto("/practice/delayed-elements-and-delayed-result-2.html");

    // Arrange:
    const elementTestId = "dti-button-element-2";
    const resultsTestId = "dti-results";
    const expectedMessage = "You clicked the button! (Delayed)";

    const buttonLocator = page.getByTestId(elementTestId);
    const results = page.getByTestId(resultsTestId);

    // Act:
    await buttonLocator.click();

    // Assert:
    await expect(results).toHaveText(expectedMessage, { timeout: 10000 });
  });
});
