export const getProductPrice = (product: Product, type: PricingType) => {
  switch (type) {
    case 'wholesale':
      return product.wholesale_price;
    case 'retail':
      return product.piece_price;
    default:
      throw new Error("Price type doesn't exist");
  }
};

export const getExpensePrice = (
  price: number,
  value: number,
  type: ExpenseType
) => {
  if (!type || !value) return 0;
  switch (type) {
    case 'percent':
      let addedPercentValue = (price / 100) * value;
      return addedPercentValue;
    case 'currency':
      let addedCurrencyValue = value;
      return addedCurrencyValue;
    default:
      throw new Error("Price type doesn't exist");
  }
};
