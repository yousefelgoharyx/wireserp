export default function getTaxPrice(price: number, taxRate: number) {
  return price !== undefined ? price + (price / 100) * taxRate : undefined;
}
