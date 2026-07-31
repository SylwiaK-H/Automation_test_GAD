import { expect as baseExpect, MatcherReturnType } from "@playwright/test";

export const expect = baseExpect.extend({
  toBeOneOfValues(actualValue: number, array: number[]): MatcherReturnType {
    let message = "";

    const isOnList = array.includes(actualValue);

    if (isOnList === true) {
      message = "Passed";
    } else {
      message = `toBeOneOfValues() assertion failed.\nYou expected ${actualValue} will be on the list [${array}]`;
    }
    return {
      message: () => message,
      pass: isOnList,
    };
  },

  toBeInRage(actualValue: string, min: number, max: number): MatcherReturnType {
    let message = "";

    const actualValueAsNumber = parseInt(actualValue);

    const isInRage = actualValueAsNumber >= min && actualValueAsNumber <= max;

    if (isInRage === true) {
      message = "Passed";
    } else {
      message = `toBeInRage() assertion failed.\nYou expected ${actualValue} to be in rage <${min} - ${max}>`;
    }
    return {
      message: () => message,
      pass: isInRage,
    };
  },

  toBeValidPercent(actualValue: string): MatcherReturnType {
    const assertionName = "toBeValidPercent";
    let messageStr: string;
    const hasPercentSign = actualValue.includes("%");
    const percentValue = parseInt(actualValue.replace("%", ""));
    const isValid = percentValue >= 0 && percentValue <= 100;
    if (isValid && hasPercentSign) {
      messageStr = "passed";
    } else {
      messageStr = `toBeValidPercent() assertion failed.\nYou expected ${actualValue} to be a valid percent value (0-100) with a '%' sign\n`;
    }
    return {
      message: () => messageStr,
      pass: isValid,
      name: assertionName,
    };
  },
  toBeValidPercentInRange(
    actualValue: string,
    min: number,
    max: number,
  ): MatcherReturnType {
    const assertionName = "toBeValidPercentInRange";
    let messageStr: string;
    const hasPercentSign = actualValue.includes("%");
    const percentValue = parseInt(actualValue.replace("%", ""));
    const isValid = percentValue >= min && percentValue <= max;
    if (isValid && hasPercentSign) {
      messageStr = "passed";
    } else {
      messageStr = `toBeValidPercentInRange() assertion failed.\nYou expected ${actualValue} to be a valid percent value in range [${min}, ${max}] with a '%' sign\n`;
    }
    return {
      message: () => messageStr,
      pass: isValid,
      name: assertionName,
    };
  },
  toBeValidPercentageWithParams(
    actualValue: string,
    min = 0,
    max = 100,
  ): MatcherReturnType {
    let message = "";
    let pass = false;
    const hasPercentSign = actualValue.includes("%");
    const percentValue = parseInt(actualValue);
    const isValid = percentValue >= min && percentValue <= max;
    if (hasPercentSign === true && isValid === true) {
      message = "passed";
      pass = true;
    } else {
      message = `toBeValidPercent() assertion failed.\n
        You expected "${actualValue}" to be
        a valid percent value (${min} - ${max}) with a '%' sign\n`;
    }
    return {
      message: () => message,
      pass,
    };
  },
});
