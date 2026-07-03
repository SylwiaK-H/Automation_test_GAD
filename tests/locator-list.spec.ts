import { test, expect} from"@playwright/test";

test.describe("locator list", () => {
    test.beforeEach(async({page}) =>{
        await page.goto("/practice/simple-multiple-elements-no-ids.html");
    })

    test("All buttons on page", async({page}) =>{
        // Arrange
        const elementRole = 'button'
        const buttonLocator = page.getByRole(elementRole);
        const expectedElementCount = 7;

        console.log(await buttonLocator.count());
        // Act
       
        // Assert
        await expect(buttonLocator).toHaveCount(expectedElementCount);
    });
    
    test("All buttons on page - should fail on action", async({page}) =>{
        // Arrange
        const elementRole = 'button'
        const expectedElementCount = 7;
        const resultsTestId = "dti-results";
        
        const buttonLocator = page.getByRole('button', { name: 'Click here!' });
        const resultsLocator = page.getByTestId(resultsTestId);

        // Error: locator.click: Error: strict mode violation: getByRole('button') resolved to 7 elements:
        // 1) <button id="btnPractice" class="button-primary" data-testid="open-practice">Main Practice Page</button> aka getByTestId('open-practice')
        // 2) <button class="my-button" onclick="buttonOnClick()">Click me!</button> aka getByRole('button', { name: 'Click me!' })
        // 3) <button class="my-button" onclick="buttonOnClick('(Second one!)')">Click me too!</button> aka getByRole('button', { name: 'Click me too!' })
        // 4) <button class="my-button" onclick="buttonOnClick('(Third one!)')">Click here!</button> aka getByRole('button', { name: 'Click here!' })
        // 5) <button class="my-button" onclick="buttonOnClick('(row 1)')">Click!</button> aka getByRole('row', { name: 'Row 1 X Click!' }).getByRole('button')
        // 6) <button class="my-button" onclick="buttonOnClick('(row 2)')">Click!</button> aka getByRole('row', { name: 'Row 2 Y Click!' }).getByRole('button')
        // 7) <button class="my-button" onclick="buttonOnClick('(row 3)')">Click!</button> aka getByRole('button', { name: 'Click!' }).nth(2)
        // console.log(await buttonLocator.count());
        // You clicked the button! (Third one!)
        // Act
        await buttonLocator.click()

        console.log(await resultsLocator.textContent());
        // Assert
        // await expect(buttonLocator).toHaveCount(expectedElementCount);
    });

    test("action on nth button", async({page}) =>{
        // Arrange
        const elementRole = 'button'
        const resultsTestId = "dti-results";
        const expectedMessage = "You clicked the button! (Second one!)";

        const buttonLocator = page.getByRole(elementRole);
        const resultLocator = page.getByTestId(resultsTestId);

        // Act
        await buttonLocator.nth(2).click();

        // Assert
        await expect(resultLocator).toHaveText(expectedMessage);
        
    });

    test("action on multiple buttons", async({page}) =>{
        // Arrange
        const elementRole = 'button'
        const elementText = 'Click!'
        const resultsTestId = "dti-results";

        const buttonLocator = page.getByRole(elementRole, { name: elementText });
        const resultLocator = page.getByTestId(resultsTestId);

        // Act
        // await buttonLocator.first().click();
        // console.log(await resultLocator.textContent());
        // await buttonLocator.nth(1).click();
        // console.log(await resultLocator.textContent());
        // await buttonLocator.last().click();
        // console.log(await resultLocator.textContent());

        const numberOfElements = await buttonLocator.count()
        for (let index = 0; index < numberOfElements; index++) {
            await buttonLocator.nth(index).click();
            console.log(await resultLocator.textContent());
        }

        const allButtonLocators = await buttonLocator.all();
        for (const button of allButtonLocators) {
            await button.click();
            console.log(await resultLocator.textContent());
        }
    });
});