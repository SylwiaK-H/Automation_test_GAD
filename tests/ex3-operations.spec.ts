import { test, expect } from "@playwright/test";

test.describe("Reservation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-reservation-v1.html");
  });

  test("Simple reservation with one feature", async ({ page }) => {
    // Arrange:
    const checkboxRole = "checkbox";
    const checkboxText = "Food";
    const buttonRole = "button";
    const reservationDate = "23.10.2024";
    const resultsTestId = "dti-results";
    const rowRole = "row";
    const expectedMessage =
      "Reservation for 23.10.2024 with features: Food for total price: 150$";
    const checkoutButtonText = "Checkout";

    const resultsLocator = page.getByTestId(resultsTestId);

    const checkBoxLocator = page
      .getByRole(rowRole, { name: checkboxText })
      .getByRole(checkboxRole);

    const buttonLocator = page
      .getByRole(rowRole, { name: reservationDate })
      .getByRole(buttonRole);

    const checkoutButtonLocator = page
      .getByRole(buttonRole)
      .filter({ hasText: checkoutButtonText });

    // Act:
    await checkBoxLocator.check();
    await buttonLocator.click();
    await checkoutButtonLocator.click();

    // Assert:
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
