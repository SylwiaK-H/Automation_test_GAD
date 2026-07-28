import { test, expect } from "@playwright/test";

test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-multiple-elements-no-ids.html");
  });

  test.describe("Finding element - different approaches", () => {
    test("Single button click using options", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const resultsTestId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page.getByRole(elementRole, { name: elementText });
      const resultsLocator = page.getByTestId(resultsTestId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test("Single button click (using filter and hasText)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const resultTestId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page
        .getByRole(elementRole)
        .filter({ hasText: elementText });
      const resultLocator = page.getByTestId(resultTestId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultLocator).toHaveText(expectedMessage);
    });
  });

  test.describe("Buttons in table - dfferent approaches", () => {
    test("Single button click (chain getBy)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const parentRole = "row";
      const parentText = "Row 2";
      const expecctedMessage = "You clicked the button! (row 2)";
      const resultTestId = "dti-results";

      const resultsLocator = page.getByTestId(resultTestId);
      const buttonLocator = page
        .getByRole(parentRole, { name: parentText })
        .getByRole(elementRole);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expecctedMessage);
    });

    test("Single button click (using filter)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const parentRole = "row";
      const parentText = "Row 2";
      const expecctedMessage = "You clicked the button! (row 2)";
      const resultTestId = "dti-results";

      const resultsLocator = page.getByTestId(resultTestId);
      const buttonLocator = page
        .getByRole(parentRole)
        .filter({ has: page.getByText(parentText) })
        .getByRole(elementRole);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expecctedMessage);
    });
  });
});
