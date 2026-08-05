import { test, expect } from "@playwright/test";

test.describe("Test User Data", () => {
  test("Check user name visibility", async ({ page }) => {
    // Arrange:
    const userNameTestId = "user-full-name";
    const usernameSelector = page.getByTestId(userNameTestId);

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert:
    await expect(usernameSelector).toBeVisible();

    const userName = await usernameSelector.innerText();
    console.log(userName);
  });

  test("Check User Name", async ({ page }) => {
    // Arrange:
    const userNameTestId = "user-full-name";
    const usernameSelector = page.getByTestId(userNameTestId);
    const expectedUserName = "Jon Doe";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      await route.fulfill({ json: mockedUserData });
    });

    // Act:
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert:
    await expect(usernameSelector).toHaveText(expectedUserName);
  });

    test("Missing birthdate", async ({ page }) => {
    // Arrange:
    const birthdateTestId = "user-date-of-birth";
    const birthdateSelector = page.getByTestId(birthdateTestId);
    const expectedBirthdate = "[No Data]";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = undefined; // Simulate missing birthdate
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert:
    await expect(birthdateSelector).toHaveText(expectedBirthdate);
  });

      test("Birth date 100 years ago", async ({ page }) => {
    // Arrange:
    const ageTestId = "user-age";
    const ageSelector = page.getByTestId(ageTestId);
    const expectedAge = "101";
    const birthDate = "1925-03-22T23:00:00.000Z";

    await page.route("/api/v1/data/random/simple-user", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      console.log(json);
      json.dateOfBirth = birthDate; // Simulate missing birthdate
      await route.fulfill({ json: json });
    });

    // Act:
    await page.goto("/practice/random-simple-user-v1.html");

    // Assert:
    await expect(ageSelector).toHaveText(expectedAge);
  });
});

const mockedUserData = {
  userId: "U6534",
  username: "charliegonzalez891",
  firstName: "Jon",
  lastName: "Doe",
  email: "charliegonzalez891@test.test.com",
  phone: "+845-555-343-2586",
  dateOfBirth: "1997-03-22T23:00:00.000Z",
  profilePicture: "facca2a3-2ca9-4fc6-8a21-28214c0a2bd7.jpg",
  address: {
    street: "904 Maple Street",
    city: "National City",
    postalCode: 89039,
    country: "South Africa",
  },
  lastLogin: "2021-10-01T22:00:00.000Z",
  accountCreated: "2022-06-10T22:00:00.000Z",
  status: 1,
};
