import { expect } from '@playwright/test';
import { findArrayDifferences } from './arrayUtils';

export function expectFundsToMatch(
    expectedFunds: string[],
    actualFunds: string[]
) {
    const {
        onlyInArr1: onlyInExpected,
        onlyInArr2: onlyInActual,
    } = findArrayDifferences(expectedFunds, actualFunds);

    const errorMessage = `
Funds missing in actual:
${onlyInExpected.length > 0 ? onlyInExpected.join(', ') : 'None'}

Extra funds in actual:
${onlyInActual.length > 0 ? onlyInActual.join(', ') : 'None'}
`;

    expect(onlyInExpected.length + onlyInActual.length, errorMessage).toBe(0);
}
