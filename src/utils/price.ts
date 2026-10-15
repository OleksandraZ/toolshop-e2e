/** Converts US-format UI text like "$1,299.00" into 1299. Throws if no number is found.
 *  Not for European formats ("1.299,00 €"): they parse silently wrong. */
export function parsePrice(text: string): number {
  const value = Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(value)) {
    throw new Error(`Cannot parse price from "${text}"`);
  }
  return value;
}

/** Money comparison in integers avoids 0.1 + 0.2 = 0.30000000000000004 problems. */
export const toCents = (price: number): number => Math.round(price * 100);

export function sortNumbers(values: readonly number[], direction: 'asc' | 'desc'): number[] {
  return [...values].sort((a, b) => (direction === 'asc' ? a - b : b - a));
}
