import type { Locator, MatcherReturnType } from "@playwright/test";
import { expect as baseExpect } from "@playwright/test";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  async toHaveMaxLength(
    locator: Locator,
    expectedValue: number,
    options?: { timeout?: number },
  ): Promise<MatcherReturnType> {
    const assertionName = "toHaveMaxLength";
    let pass: boolean;
    let messageStr: string;
    let actualValue = undefined;

    try {
      await baseExpect(locator).toHaveAttribute(
        "maxlength",
        String(expectedValue),
        options,
      );
      pass = true;
    } catch (e: any) {
      actualValue = e.matcherResult?.actual;
      pass = false;
    }

    if (pass) {
      messageStr = "passed";
    } else {
      messageStr = `toHaveMaxLength() assertion failed.\n
      You expected the locator to have a maxlength of ${expectedValue}\n
      But got: ${actualValue}\n`;
    }

    return {
      message: () => messageStr,
      pass,
      name: assertionName,
      expected: expectedValue,
      actual: actualValue,
    };
  },
});
