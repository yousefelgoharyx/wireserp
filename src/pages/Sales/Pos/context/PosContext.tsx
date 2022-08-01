import { useForm, UseFormReturnType } from '@mantine/form';
import React, { useContext, useState } from 'react';
import { useProductsList } from '../../../../api/store/useProducts';

interface ContextModel {
  invoiceInfo: PosInvoiceInfo;
  setInvoiceInfo: setStateAction<PosInvoiceInfo>;
  addProductForm: UseFormReturnType<PosProductForm>;
  products: PosProduct[];
  addProduct: (values: PosProductForm) => void;
  removeProduct: (id: number) => void;
}

const PosStateContext = React.createContext<ContextModel>(null);
const PosProvider = ({ children }) => {
  const { data: productsData } = useProductsList();
  const [products, setProducts] = useState<PosProduct[]>([]);
  const [invoiceInfo, setInvoiceInfo] = useState<PosInvoiceInfo>({
    client_id: null,
    discount: 0,
    price: 0,
    products: [],
    total_price: 0,
    withTax: true,
  });
  const addProductForm = useForm<PosProductForm>({
    initialValues: {
      id: null,
      price: 0,
      quantity: 0,
    },
  });

  function addProduct(values: PosProductForm) {
    // if product already exists in products, update quantity
    const selectedProduct = productsData.find((p) => p.id === values.id);
    const newProducts = [...products];
    const product = newProducts.find((p) => p.id === values.id);
    if (product) {
      const productPrice = product.price / product.quantity;
      product.quantity += values.quantity;
      product.price = productPrice * product.quantity;
    } else newProducts.push({ ...values, name: selectedProduct.product_name });
    setProducts(newProducts);
    addProductForm.reset();
  }

  function removeProduct(id: number) {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
  }
  return (
    <PosStateContext.Provider
      value={{
        invoiceInfo,
        setInvoiceInfo,
        addProductForm,
        products,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </PosStateContext.Provider>
  );
};

export default PosProvider;

export const usePosContext = () => useContext(PosStateContext);
