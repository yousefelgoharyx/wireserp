export const isValue = (value: any) => {
  return value !== undefined && value !== null;
};
export const withTax = (price: number, taxRate: number) => {
  return isValue(price) ? price + (price / 100) * taxRate : undefined;
};

export function stringify(val: number): string | null {
  return isValue(val) ? val.toString() : null;
}
