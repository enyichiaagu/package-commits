import { describe, test, expect } from 'vitest';
import { generateYrsArr } from './utils';

const currentYear = new Date().getFullYear();

describe('generateYrsArr', () => {
  test('Check for when year is only current year', () => {
    expect(generateYrsArr(currentYear, currentYear)).toStrictEqual([
      currentYear,
    ]);
  });

  test('Year should return 2025', () => {
    expect(generateYrsArr(2025, currentYear)).toStrictEqual([2025]);
  });

  test('Check for different years', () => {
    expect(generateYrsArr(2023, currentYear)).toStrictEqual([2025, 2024, 2023]);
    expect(generateYrsArr(2021, currentYear)).toStrictEqual([
      2025, 2024, 2023, 2022, 2021,
    ]);
  });
});
