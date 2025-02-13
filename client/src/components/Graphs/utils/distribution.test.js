import { expect, test } from 'vitest';
import { genMockCommits } from './mockCommits';
import { calcDistribution } from './distribution';

test('Should properly calcDistribution', () => {
  expect(calcDistribution(genMockCommits())).toStrictEqual([]);
  expect(calcDistribution(genMockCommits(4))).toStrictEqual([1, 2, 3]);
});
