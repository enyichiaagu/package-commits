import { expect, test } from 'vitest';
import { genMockCommits } from './mockCommits';
import { calcDistribution } from './distribution';

test('Should properly calcDistribution', () => {
  expect(calcDistribution(genMockCommits(0))).toStrictEqual([]);
});
