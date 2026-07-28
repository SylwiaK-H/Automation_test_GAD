import { test, expect } from "@playwright/test";

test.describe("Reservation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-reservation-v1.html");
  });

  test("simple reservation with one feature", async ({ page }) => {
    // Arrange:
    const expectedMessage =
      "Reservation for 23.10.2024 with features: Food for total price: 150$";
    const resultTestId = "dti-results";
    const rowRole = "row";
    const checkBoxName = "Food";
    const checkboxRole = "checkbox";
    const buttonRole = "button";
    const reservationDate = "23.10.2024";
    const buttonName = "Checkout";

    const resultLocator = page.getByTestId(resultTestId);

    const checkBoxLocator = page
    .getByRole(rowRole, { name: checkBoxName })
    .getByRole(checkboxRole);

    const reserveButtonLocator = page
    .getByRole(rowRole, { name: reservationDate })
    .getByRole(buttonRole);

    const checkoutButtonLocator = page
    .getByRole(buttonRole)
    .filter({ hasText: buttonName });

    //Act:
    await checkBoxLocator.check();
    await reserveButtonLocator.click();
    await checkoutButtonLocator.click();

    // Assert:
    await expect(resultLocator).toHaveText(expectedMessage);
  });
});
