import { describe, test, expect } from 'vitest';
import { resolveRes, finalCatch, CustomError } from './errors';

describe('resolveRes', () => {
  test('No status code or message', () => {
    expect(() => resolveRes(new Error())).rejects.toThrow(CustomError);
  });
});

describe('finalCatch', () => {
  test('Check error instance', () => {
    expect(() => finalCatch(new Error())).toThrow(CustomError);
    expect(() => finalCatch(new CustomError())).toThrow(CustomError);
  });

  test('No status code or message', () => {
    try {
      finalCatch(new Error());
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect(err).toHaveProperty('message', 'Something Went Wrong');
      expect(err).toHaveProperty('status', undefined);
      expect(err).toHaveProperty('isTokenError', false);
    }
  });
});
