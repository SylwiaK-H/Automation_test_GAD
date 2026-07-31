import { test } from "@playwright/test";
import { expect } from "./values.expect";

test.describe("Custom simple assertions - solution", () => {
  test("humidity is in valid percent", async ({ page }) => {
    await page.goto("/practice/simple-weather-forecast.html");
    // Arrange:
    const todaysHumidityTestId = "dti-humidity-today";
    const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);
    // Act:
    await expect(todaysHumidityLocator).toBeVisible();
    const todaysHumidity = await todaysHumidityLocator.innerText();
    // Assert:
    expect(todaysHumidity).toBeValidPercent();
    expect(todaysHumidity).toBeValidPercentInRange(0, 100);
    // or:
    expect(todaysHumidity).toBeValidPercentageWithParams();
    expect(todaysHumidity).toBeValidPercentageWithParams(0, 100);
  });
});
