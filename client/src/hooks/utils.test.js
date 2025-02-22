import { describe, test, expect } from 'vitest';
import { generateYrsArr } from './utils';

const currentYear = new Date().getFullYear();

describe('generateYrsArr', () => {
  test('Check for when year is only current year', () => {
    expect(generateYrsArr(currentYear, currentYear)).toStrictEqual([
      currentYear,
    ]);
  });

  test('Check for different years', () => {
    expect(generateYrsArr(2023, 2025)).toStrictEqual([2025, 2024, 2023]);
    expect(generateYrsArr(2024, 2025)).toStrictEqual([2025, 2024]);
    expect(generateYrsArr(2022, 2025)).toStrictEqual([2025, 2024, 2023]);
    expect(generateYrsArr(2021, 2025)).toStrictEqual([2025, 2024, 2023]);
  });

  test('Throw on error', () => {
    expect(() => generateYrsArr(currentYear + 1, currentYear)).toThrow(
      RangeError
    );
  });
});
