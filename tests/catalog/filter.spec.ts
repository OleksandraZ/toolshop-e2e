import { test, expect } from '@playwright/test';
import { knownProducts } from '@data/products';

const cases = [
  { category: 'Pliers', expected: knownProducts.pliers },
  { category: 'Hammer', expected: knownProducts.hammers },
];

for (const { category, expected } of cases) {
  test(`filtering by category "${category}" shows exactly its known products (S-06)`, async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('product-name')).not.toHaveCount(0);

    await page.getByRole('checkbox', { name: category, exact: true }).check();

    const names = page.getByTestId('product-name');
    await expect(async () => {
      const shown = (await names.allTextContents()).map((t) => t.trim());
      // correctness: every shown product is a known plier (on failure: names the intruder)

      for (const name of shown) expect(expected).toContain(name);

      // completeness: same items, order ignored, so nothing is missing either
      expect([...shown].sort()).toEqual([...expected].sort());
    }).toPass();
  });
}
