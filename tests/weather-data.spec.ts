import { test, expect } from "@playwright/test";

test.describe("test weather data", () => {
  test("get weather data and present table to user", async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = "get-weather";
    const weatherTableSelector = "results-table";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const weatherTableLocator = page.getByTestId(weatherTableSelector);

    await page.goto("/practice/random-weather-v2.html");

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(weatherTableLocator).toBeVisible();
  });

  test("weather mean temperature calculation", async ({ page }) => {
    // Arrange:
    const getWeatherButtonSelector = "get-weather";
    const meantTemperatureSelector = "dti-meanTemperature";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const meanTemperatureLocator = page.getByTestId(meantTemperatureSelector);

    const expectedMeanTemperature = "27.67";

    await page.goto("/practice/random-weather-v2.html");

    await page.route("/api/v1/data/random/weather-simple", async (route) => {
      await route.fulfill({ json: mockedWeatherApiBaseResponse });
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(meanTemperatureLocator).toHaveText(expectedMeanTemperature);
  });

  test("weather mean temperature calculation with one day from past", async ({
    page,
  }) => {
    // Arrange:
    const getWeatherButtonSelector = "get-weather";
    const meantTemperatureSelector = "dti-meanTemperature";
    const getOneDayFromPastSelector = "get-weather-past-day";
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonSelector);
    const meanTemperatureLocator = page.getByTestId(meantTemperatureSelector);
    const getOneDayFromPastLocator = page.getByTestId(
      getOneDayFromPastSelector,
    );

    const expectedMeanTemperature = "27.67";
    const expectedMeanTemperatureWithOneDayFromPast = "28.75";

    await page.goto("/practice/random-weather-v2.html");

    await page.route("/api/v1/data/random/weather-simple", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ json: mockedWeatherApiBaseResponse });
      } else {
        await route.fulfill({ json: mockedWeatherApiOneDayResponse });
      }
    });

    // Act:
    await getWeatherButtonLocator.click();

    // Assert:
    await expect(meanTemperatureLocator).toHaveText(expectedMeanTemperature);

    // Act:
    await getOneDayFromPastLocator.click();

    // Assert:
    await expect(meanTemperatureLocator).toHaveText(
      expectedMeanTemperatureWithOneDayFromPast,
    );
  });
});

const mockedWeatherApiBaseResponse = [
  {
    date: "2026-08-12",
    city: "Warsaw",
    temperature: 32,
    temperatureMin: 23,
    temperatureMax: 38,
    humidity: "82%",
    dayLength: 16,
    windSpeed: 5,
    windSpeedRange: "0-5 km/h",
  },
  {
    date: "2026-08-11",
    city: "Warsaw",
    temperature: 22,
    temperatureMin: 10,
    temperatureMax: 31,
    humidity: "69%",
    dayLength: 14,
    windSpeed: 4,
    windSpeedRange: "0-5 km/h",
  },
  {
    date: "2026-08-10",
    city: "Warsaw",
    temperature: 29,
    temperatureMin: 21,
    temperatureMax: 31,
    humidity: "46%",
    dayLength: 19,
    windSpeed: 4,
    windSpeedRange: "0-5 km/h",
  },
];

const mockedWeatherApiOneDayResponse = [
  {
    date: "2026-08-09",
    city: "Warsaw",
    temperature: 32,
    temperatureMin: 25,
    temperatureMax: 46,
    humidity: "65%",
    dayLength: 17,
    windSpeed: 1,
    windSpeedRange: "0-5 km/h",
  },
];
