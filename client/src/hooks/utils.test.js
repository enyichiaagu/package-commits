import { describe, test, expect } from 'vitest';
import { generateYrsArr, getDateRange, getYear } from './utils';

const currentYear = getYear(Date.now());
const timestamp = Date.now();

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

describe('getDateRange', () => {
  test('Check if it works for literal years', () => {
    expect(getDateRange(2010)).toStrictEqual({
      start: '2010-01-01T00:00:00.000Z',
      end: '2010-12-31T23:59:59.999Z',
    });
  });

  test('Check if it works for timestamp', () => {
    expect(getDateRange(timestamp)).toBeTypeOf('object');
    expect(getDateRange(timestamp)).toHaveProperty('start');
    expect(getDateRange(timestamp)).toHaveProperty('end');
    expect(getDateRange(timestamp).end).toMatch(currentYear);
    expect(getDateRange(timestamp).start).toMatch(currentYear - 1);
  });
});
