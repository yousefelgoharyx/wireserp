export type ProductAction =
  | { type: 'add'; payload: PosProduct }
  | { type: 'remove'; payload: { id: number } };

function productsReducer(
  products: PosProduct[],
  action: ProductAction
): PosProduct[] {
  switch (action.type) {
    case 'add':
      const existingProduct = products.find((p) => p.id === action.payload.id);
      if (existingProduct) {
        const newProduct = { ...existingProduct };
        const newProducts = products.filter((p) => p.id !== existingProduct.id);
        newProduct.quantity += action.payload.quantity;
        newProducts.push(newProduct);
        return newProducts;
      } else {
        const newProducts = [...products];
        newProducts.push({ ...action.payload });
        return newProducts;
      }
    case 'remove':
      return products.filter((p) => p.id !== action.payload.id);
    default:
      throw new Error('Action type must be specified');
  }
}

export default productsReducer;
