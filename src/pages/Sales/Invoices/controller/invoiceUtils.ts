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
