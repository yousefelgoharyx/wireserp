import React, { useContext, useReducer, useState } from 'react';
import invoiceInfoReducer, { InvoiceInfoAction } from './invoiceInfoReducer';
import productsReducer, { ProductAction } from './productsReducer';

interface ContextModel {
  products: PosProduct[];
  productsDispatch: React.Dispatch<ProductAction>;
  invoiceInfo: PosInvoiceInfo;
  invoiceInfoDispatch: React.Dispatch<InvoiceInfoAction>;
}

const PosStateContext = React.createContext<ContextModel>(null);
const PosProvider = ({ children }) => {
  const [products, productsDispatch] = useReducer(productsReducer, []);
  const [invoiceInfo, invoiceInfoDispatch] = useReducer(invoiceInfoReducer, {
    client_id: null,
    discount: 0,
    withTax: true,
  });

  return (
    <PosStateContext.Provider
      value={{
        invoiceInfo,
        invoiceInfoDispatch,
        products,
        productsDispatch,
      }}
    >
      {children}
    </PosStateContext.Provider>
  );
};

export default PosProvider;

export const usePosContext = () => useContext(PosStateContext);
