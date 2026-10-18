import { test, expect } from '@playwright/test';

test('visitor can search products by name', async ({ page }) => {
  const term = 'pliers';

  await page.goto('/');
  // S-01: catalogue is loaded — at least one product visible
  await expect(page.getByTestId('product-name')).not.toHaveCount(0);

  await page.getByTestId('search-query').fill(term);
  await page.getByTestId('search-submit').click();

  // The caption tells us the search was applied
  await expect(page.getByTestId('search-caption')).toContainText(term);

  // S-02: EVERY visible product matches. The list is re-rendered asynchronously,
  // so we retry the whole check until it passes (or 10 s timeout).
  const productNames = page.getByTestId('product-name');
  await expect(async () => {
    const names = await productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain(term);
    }
  }).toPass();
});

test('search result opens details page with the same name and price', async ({ page }) => {
  const term = 'hammer';
  await page.goto('/');
  await expect(page.getByTestId('product-name')).not.toHaveCount(0);

  await page.getByTestId('search-query').fill(term);
  await page.getByTestId('search-submit').click();

  await expect(page.getByTestId('search-caption')).toContainText(term);

  const productNames = page.getByTestId('product-name');
  await expect(async () => {
    const names = await productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain(term);
    }
  }).toPass();

  // .first() on purpose: any search result will do, we only need one product to open
  const firstProductName = page.getByTestId('product-name').first();
  const expectedName = await firstProductName.innerText();
  const expectedPrice = await page.getByTestId('product-price').first().innerText();

  await firstProductName.click();

  await expect(page).toHaveURL(/\/product\//);
  await expect(page.getByTestId('product-name')).toHaveText(expectedName);
  const expectedPriceTrimmed = expectedPrice.replace('$', '');
  await expect(page.getByTestId('unit-price')).toHaveText(expectedPriceTrimmed);
});

test('search of non-existing product gives "no results" message (S-03)', async ({ page }) => {
  const term = 'xyz-no-such-tool';

  await page.goto('/');
  await expect(page.getByTestId('product-name')).not.toHaveCount(0);

  await page.getByTestId('search-query').fill(term);
  await page.getByTestId('search-submit').click();
  await expect(page.getByTestId('search-caption')).toContainText(term);

  // S-03: Search with no matches - empty-results message; no product cards
  // test-id used - it stays the same in every language
  await expect(page.getByTestId('no-results')).toBeVisible();
  // Message first: it only appears once the search has finished with no matches.
  // Then the count: 0 cards could also mean "still loading".
  await expect(page.getByTestId('product-name')).toHaveCount(0);
});
