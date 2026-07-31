import { test } from "@playwright/test";
import { expect } from "./values.expect";

test.describe("Weather forecast tests", () => {
  test("temperature in range", async ({ page }) => {
    // Arrange:
    const todaysTemperatureTestedId = "dti-temperature-today";
    const todaysTemperatureLocator = page.getByTestId(
      todaysTemperatureTestedId,
    );
    const minExpectedTemp = -30;
    const maxExpectedTemp = 50;
    // Act:
    await page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysTemperatureLocator).toBeVisible();

    const tempValue = await todaysTemperatureLocator.innerText();
    const tempValueAsNumber = parseInt(tempValue);
    // Assert:
    expect(tempValueAsNumber).toBeGreaterThanOrEqual(minExpectedTemp);
    expect(tempValueAsNumber).toBeLessThanOrEqual(maxExpectedTemp);
  });

  test("temperature in range (custom assertion", async ({ page }) => {
    // Arrange:
    const todaysTemperatureTestedId = "dti-temperature-today";
    const todaysTemperatureLocator = page.getByTestId(
      todaysTemperatureTestedId,
    );
    const minExpectedTemp = -30;
    const maxExpectedTemp = 50;
    // Act:
    await page.goto("/practice/simple-weather-forecast.html");
    await expect(todaysTemperatureLocator).toBeVisible();

    const tempValue = await todaysTemperatureLocator.innerText();
    // Assert:
    expect(tempValue).toBeInRage(minExpectedTemp, maxExpectedTemp);
  });
});
