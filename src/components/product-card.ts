import { type Locator } from '@playwright/test';
import { type ProductSummary } from '@models/product';
import { parsePrice } from '@utils/price';

export class ProductCard {
  readonly name: Locator;
  readonly price: Locator;

  constructor(readonly root: Locator) {
    this.name = root.getByTestId('product-name');
    this.price = root.getByTestId('product-price');
  }

  async readSummary(): Promise<ProductSummary> {
    const name = (await this.name.innerText()).trim();
    const price = parsePrice(await this.price.innerText());

    return { name: name, price: price };
  }
}
