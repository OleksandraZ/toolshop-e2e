export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
}

/** What a product card shows — used to compare list page vs details page. */
export type ProductSummary = Pick<Product, 'name' | 'price'>;
