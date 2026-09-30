/**
 * Shapes of the Toolshop API product responses (snake_case, as the API sends them).
 *
 * INTERIM VERSION: written from real responses on 2026-09-30
 * (GET /products, all 50 products; GET /products/{id}). Day 5 replaces this
 * with zod schemas that are checked at runtime.
 */

/** Seen in data: B, C, D, E. 'A' is only assumed from the UI sort option "CO₂ Rating (A - E)". */
export type Co2Rating = 'A' | 'B' | 'C' | 'D' | 'E';

export interface ApiProductImage {
  id: string;
  by_name: string;
  by_url: string;
  source_name: string;
  source_url: string;
  file_name: string;
  title: string;
}

export interface ApiCategoryRef {
  id: string;
  name: string;
  slug: string;
}

export interface ApiBrandRef {
  id: string;
  name: string;
}

/** One product as returned in the GET /products list. */
export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: Co2Rating;
  in_stock: boolean;
  is_eco_friendly: boolean;
  product_image: ApiProductImage;
  category: ApiCategoryRef;
  brand: ApiBrandRef;
}

export interface ApiProductSpec {
  id: string;
  product_id: string;
  spec_name: string;
  /** Always a string in the API, even for numbers ("200"). */
  spec_value: string;
  /** null when the value has no unit (e.g. "Material"). */
  spec_unit: string | null;
}

/** GET /products/{id}: the list fields plus specs. */
export interface ApiProductDetail extends ApiProduct {
  specs: ApiProductSpec[];
}

/** Laravel-style pagination wrapper around GET /products. */
export interface ApiPage<T> {
  current_page: number;
  data: T[];
  /** null when the page is empty (e.g. ?page=99 → data: []). */
  from: number | null;
  last_page: number;
  per_page: number;
  /** null when the page is empty. */
  to: number | null;
  total: number;
}
