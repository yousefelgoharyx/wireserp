export default function getTaxOf(price: number, taxRate: number) {
  return price + (price / 100) * taxRate;
}
