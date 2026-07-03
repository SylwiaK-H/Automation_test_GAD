import { test, expect } from "@playwright/test";

test.describe("Multiple checkboxes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-multiple-elements-no-ids.html");
  });

  test("action on multiple checkboxes", async ({ page }) => {
    // Arrange:
    const elementRole = "checkbox";
    const resultsTestId = "dti-results";
    const elementMessage = [
      "Checkbox is checked! (Opt 1!)",
      "Checkbox is checked! (Opt 2!)",
      "Checkbox is checked! (Opt 3!)",
      "Checkbox is checked! (Opt 4!)",
      "Checkbox is checked! (Opt 5!)",
    ];
    const expectNumberOfElements = 5;

    const checkboxLocator = page.getByRole(elementRole);
    const resultLocator = page.getByTestId(resultsTestId);

    // Assert:
    await expect(checkboxLocator).toHaveCount(expectNumberOfElements);

    // Act:
    const numberOfFoundElements = await checkboxLocator.count();
    for (let i = 0; i < numberOfFoundElements; i++) {
        // Act:
        await checkboxLocator.nth(i).check();
        console.log(await resultLocator.innerText());

        // Assert:
        await expect.soft(resultLocator).toHaveText(elementMessage[i]);
    }
  });
});
