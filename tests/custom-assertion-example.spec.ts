import { test } from "@playwright/test";
import { expect } from "./values.expect";


test.describe("Custom assertion examples", () => {
  test("values is on of expected values", async () => {
    // Arrange:
    const myValue = 2;
    const possibleValues = [1, 2, 3];


    // Assert:
    const isOnList = possibleValues.includes(myValue);
    expect(isOnList).toBeTruthy();
  });


  test("values is on of expected values (custom assertion)", async () => {
    // Arrange:
    const myValue = 2;
    const possibleValues = [1, 2, 3];


    // Assert:
    expect(myValue).toBeOneOfValues(possibleValues);
  });
});