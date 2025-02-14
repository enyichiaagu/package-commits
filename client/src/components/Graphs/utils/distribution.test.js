import { describe, test, expect } from 'vitest';
import { genMockCommits } from './mockCommits';
import { calcDistribution, monthlyCommitsY } from './distribution';

describe('calcDistribution', () => {
  test('Should return an empty array if no commits', () => {
    expect(calcDistribution(genMockCommits())).toStrictEqual([]);
    expect(calcDistribution(genMockCommits(0))).toStrictEqual([]);
  });

  test('Should properly calcDistribution', () => {
    expect(calcDistribution(genMockCommits(4))).toStrictEqual([1, 2, 3]);
  });
});

describe('monthlyCommitsY', () => {
  test('Should return null if no commits', () => {
    expect(monthlyCommitsY(0)).toBeNull();
  });

  test('Should work when commits <= 4', () => {
    expect(monthlyCommitsY(1)).toStrictEqual([0, 1]);
    expect(monthlyCommitsY(2)).toStrictEqual([0, 1, 2]);
    expect(monthlyCommitsY(4)).toStrictEqual([0, 1, 2, 3, 4]);
  });

  test('Should work when commits > 4', () => {
    expect(monthlyCommitsY(5)).toStrictEqual([0, 5, 10, 15, 20]);
    expect(monthlyCommitsY(40)).toStrictEqual([0, 10, 20, 30, 40]);
    expect(monthlyCommitsY(192)).toStrictEqual([0, 50, 100, 150, 200]);
  });
});
