import { test } from "@playwright/test";
import { expect } from "./temperature.expect";


test.describe("Weather forecast tests - temperature (custom web first assertion)", () => {
  test("temperature in range (custom assertion)", async ({ page }) => {
    await page.goto("/practice/simple-weather-forecast-delay.html");


    // Arrange:
    const todaysTemperatureTestId = "dti-temperature-today";
    const todaysTemperatureLocator = page.getByTestId(todaysTemperatureTestId);
    const minExpectedTemp = -30;
    const maxExpectedTemp = 50;


    // Act:
    await expect(todaysTemperatureLocator).toBeVisible();
    const tempValue = await todaysTemperatureLocator.innerText();


    // Assert:
    expect(tempValue).toBeInRange(minExpectedTemp, maxExpectedTemp);
  });


  test("temperature in range (custom web first assertion)", async ({
    page,
  }) => {
    await page.goto("/practice/simple-weather-forecast-delay.html");


    // Arrange:
    const todaysTemperatureTestId = "dti-temperature-today";
    const todaysTemperatureLocator = page.getByTestId(todaysTemperatureTestId);


    // Assert:
    await expect(todaysTemperatureLocator).elementValueToBeInRange(-20, 50);
  });
});