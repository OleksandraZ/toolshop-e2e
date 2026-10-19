import { type Locator } from '@playwright/test';

export class NavBar {
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;

  constructor(readonly root: Locator) {
    this.cartLink = root.getByRole('link', { name: 'cart', exact: true });
    this.cartQuantity = root.getByTestId('cart-quantity');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
