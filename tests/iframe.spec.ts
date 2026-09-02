import { test, expect } from "@playwright/test";


test.describe("Test iframes", () => {
  test("submit data in iframe", async ({ page }) => {
    await page.goto("/practice/iframe-0.html");


    // Arrange:
    const inputSelector = "name-input";
    const submitButtonSelector = "submit";
    const resultsSelector = "results";

    const frame = page.getByTestId("dti-simple-iframe").contentFrame();

    const inputLocator = frame.getByTestId(inputSelector);
    const submitButtonLocator = frame.getByTestId(submitButtonSelector);
    const resultsLocator = frame.getByTestId(resultsSelector);


    const inputText = "John Doe";
    const expectedText = `Hello, ${inputText}!`;


    // Act:
    await inputLocator.fill("John Doe");
    await submitButtonLocator.click();


    // Assert:
    await expect(resultsLocator).toHaveText(expectedText);
  });


  test("submit registration data in nested iframe", async ({ page }) => {
    await page.goto("/practice/iframe-4.html");


    // Arrange:
    const usernameInputSelector = "username-input";
    const passwordInputSelector = "password-input";
    const submitButtonSelector = "register-submit";
    const resultsSelector = "register-results";

    const frame = page.getByTestId("dti-simple-iframe").contentFrame();
    const mastedFrame = frame.locator("#inner-iframe").contentFrame();

    const usernameInputLocator = mastedFrame.getByTestId(usernameInputSelector);
    const passwordInputLocator = mastedFrame.getByTestId(passwordInputSelector);
    const submitButtonLocator = mastedFrame.getByTestId(submitButtonSelector);
    const resultsLocator = mastedFrame.getByTestId(resultsSelector);


    const username = "John Doe";
    const password = "12345678";


    const expectedText = `Registration successful! Username: ${username}, Age: 18, Password: ********`;


    // Act:
    await usernameInputLocator.fill(username);
    await passwordInputLocator.fill(password);
    await submitButtonLocator.click();


    // Assert:
    await expect(resultsLocator).toHaveText(expectedText);
  });
});