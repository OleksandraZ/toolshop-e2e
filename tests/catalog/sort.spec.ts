import { test, expect } from '@playwright/test';
import { parsePrice, sortNumbers } from '@utils/price';

const cases = [
  { sortingName: 'Price (Low - High)', direction: 'asc', scenario: 'S-08' },
  { sortingName: 'Price (High - Low)', direction: 'desc', scenario: 'S-09' },
] as const;

for (const { sortingName, direction, scenario } of cases) {
  test(`products can be sorted by "${sortingName}" (${scenario})`, async ({ page }) => {
    await page.goto('/');
    const prices = page.getByTestId('product-price');
    await expect(prices).not.toHaveCount(0);

    await page.getByTestId('sort').selectOption({ label: sortingName });

    await expect(async () => {
      const values = (await prices.allTextContents()).map(parsePrice);
      expect(values).toEqual(sortNumbers(values, direction));
    }).toPass();
  });
}
