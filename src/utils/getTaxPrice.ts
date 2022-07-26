export default function getTaxPrice(price: number, taxRate: number) {
  return price ? price + (price / 100) * taxRate : undefined;
}
