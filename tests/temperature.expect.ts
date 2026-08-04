import type { Locator, MatcherReturnType } from "@playwright/test";
import { expect as baseExpect } from "@playwright/test";


export const expect = baseExpect.extend({
  toBeInRange(
    actualValue: string,
    min: number,
    max: number,
  ): MatcherReturnType {
    let message = "";


    const actualValueAsNumber = parseInt(actualValue);
    const isInRage = actualValueAsNumber >= min && actualValueAsNumber <= max;


    if (isInRage === true) {
      message = "Passed";
    } else {
      message = `toBeInRange() assertion failed.\nYou expected ${actualValue} to be in rage <${min} - ${max}>`;
    }
    return {
      message: () => message,
      pass: isInRage,
    };
  },
  async elementValueToBeInRange(
    locator: Locator,
    min: number,
    max: number,
    options?: {
      timeout?: number;
    },
  ): Promise<MatcherReturnType> {
    let pass = false;
    let message = "";
    let actualValue = "";


    try {
      await baseExpect(locator).toBeVisible(options);
      const elementValue = await locator.innerText();
      const elementValueAsNumber = parseInt(elementValue);
      const isInRange =
        elementValueAsNumber >= min && elementValueAsNumber <= max;
      pass = isInRange;
      actualValue = elementValue;
    } catch (error) {
      actualValue = error.matcherResult?.actual;
      pass = false;
    }


    if (pass === true) {
      message = "Passed";
    } else {
      message = `elementValueToBeInRange() assertion failed.\n
      You expected the locator to have a value between ${min} and ${max}\n
      But got: ${actualValue}\n`;
    }


    return {
      message: () => message,
      pass,
      expected: [min, max],
      actual: actualValue,
    };
  },
});