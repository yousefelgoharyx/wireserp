import { isValue } from './all';

export default function getTaxPrice(price: number, taxRate: number) {
  return isValue(price) ? price + (price / 100) * taxRate : undefined;
}
