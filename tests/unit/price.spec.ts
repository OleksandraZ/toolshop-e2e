import { test, expect } from '@playwright/test';
import { parsePrice, toCents, sortNumbers } from '@utils/price';

test.describe('parsePrice', () => {
  const valid = [
    { input: '$14.15', expected: 14.15 },
    { input: '$0.99', expected: 0.99 },
    { input: ' $1,299.00 ', expected: 1299 },
  ];
  for (const { input, expected } of valid) {
    test(`parses "${input}"`, () => {
      expect(parsePrice(input)).toBe(expected);
    });
  }

  test('throws on text without a number', () => {
    expect(() => parsePrice('free')).toThrow(/Cannot parse price/);
  });
});

test('toCents avoids floating-point drift', () => {
  expect(toCents(0.1 + 0.2)).toBe(30);
});

test.describe('sortNumbers', () => {
  const valid = [
    { input: [3, 1, 2], direction: 'asc', expected: [1, 2, 3] },
    { input: [3, 1, 2], direction: 'desc', expected: [3, 2, 1] },
    { input: [], direction: 'asc', expected: [] },
    { input: [1, 2, 3], direction: 'asc', expected: [1, 2, 3] },
  ] as const;
  for (const { input, direction, expected } of valid) {
    test(`sorts "${JSON.stringify(input)}", "${direction}" into "${JSON.stringify(expected)}"`, () => {
      expect(sortNumbers(input, direction)).toEqual(expected);
    });
  }

  test('does not modify the original array', () => {
    const input = [3, 1, 2];
    const copy = [...input];
    sortNumbers(input, 'asc');
    expect(input).toEqual(copy);
  });
});
