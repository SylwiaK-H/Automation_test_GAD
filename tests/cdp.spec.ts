import { test, expect } from "@playwright/test";

test.describe("CDP communication", () => {
  test(`emulate network throttle `, async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const sdpSession = await context.newCDPSession(page);
    await sdpSession.send("Network.emulateNetworkConditions", {
      // slow 3G
      offline: false,
      downloadThroughput: ((500 * 1000) / 8) * 0.8,
      uploadThroughput: ((500 * 1000) / 8) * 0.8,
      latency: 400 * 5,
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test("script execution disabled", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const sdpSession = await context.newCDPSession(page);
    await sdpSession.send("Emulation.setScriptExecutionDisabled", {
      value: true,
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).not.toBeVisible();
  });

  test("mobile view", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const sdpSession = await context.newCDPSession(page);
    await sdpSession.send("Emulation.setDeviceMetricsOverride", {
      deviceScaleFactor: 1,
      mobile: true,
      height: 800,
      width: 400,
    });

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

   test("performance metrics", async ({ context, page }) => {
    // Arrange:
    const tableSelector = "results-table";
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = "get-weather";
    const buttonLocator = page.getByTestId(buttonSelector);

    const sdpSession = await context.newCDPSession(page);
    await sdpSession.send("Performance.enable");

    // Act:
    await page.goto("/practice/random-weather-v2.html");
    await page.waitForLoadState("domcontentloaded");

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();

    const metrics = await sdpSession.send("Performance.getMetrics");
    console.log(metrics);
  });
});
