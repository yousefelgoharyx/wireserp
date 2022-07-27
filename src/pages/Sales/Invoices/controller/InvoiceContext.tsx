import { useForm, UseFormReturnType, yupResolver } from '@mantine/form';
import React from 'react';
import { useProductsList } from '../../../../api/store/useProducts';
import find from '../../../../utils/find';
import moneyFormatter from '../../../../utils/moneyFormatter';
import { ExpenseForm, InvoiceForm, PaymentForm } from '../model/schema';

const invoiceInitialValues: InvoiceForm = {
  client_id: null,
  date_time: new Date(),
  warehouse_id: null,
  value_added_tax: '1',
  final_total: undefined,
  product_id: null,
  product_price: undefined,
  quantity: undefined,
  unit: 'unit',
  quantity_price: undefined,
};

interface Context {
  id: number | null;
  items: InvoiceForm[];
  status: 'creating' | 'adding';
  setId: (id: number | null) => void;
  setItems: (items: InvoiceForm[]) => void;
  setStatus: (status: 'creating' | 'adding') => void;
  form: UseFormReturnType<InvoiceForm>;
  discountForm: UseFormReturnType<ExpenseForm>;
  shippingForm: UseFormReturnType<ExpenseForm>;
  paymentForm: UseFormReturnType<PaymentForm>;
  invoiceRows: InvoiceItem[];
}

const InvoiceContext = React.createContext<Context>(null);

const InvoiceProvider = ({ children }) => {
  const [id, setId] = React.useState<number | null>(null);
  const [items, setItems] = React.useState<InvoiceForm[]>([]);
  const [status, setStatus] = React.useState<'creating' | 'adding'>('creating');
  const { data: products } = useProductsList();
  const form = useForm<InvoiceForm>({
    validate: yupResolver(InvoiceForm),
    initialValues: invoiceInitialValues,
  });

  const discountForm = useForm<ExpenseForm>({
    validate: yupResolver(ExpenseForm),
    initialValues: {
      id: null,
      action: 'total',
      action_type: 'currency',
      value: undefined,
    },
  });

  const shippingForm = useForm<ExpenseForm>({
    validate: yupResolver(ExpenseForm),
    initialValues: {
      id: null,
      action: 'shipping',
      action_type: 'currency',
      value: undefined,
    },
  });

  const paymentForm = useForm<PaymentForm>({
    validate: yupResolver(PaymentForm),
    initialValues: {
      id: null,
      value: undefined,
    },
  });

  const invoiceRows: InvoiceItem[] = items.map((item) => {
    return {
      product_name: find(item.product_id, products).product_name,
      product_id: item.product_id,
      product_price: item.product_price,
      amount: item.quantity + ' ' + item.unit,
      total_price: moneyFormatter(item.final_total.toString()),
    };
  });
  return (
    <InvoiceContext.Provider
      value={{
        id,
        items,
        status,
        setId,
        setItems,
        setStatus,
        form,
        discountForm,
        shippingForm,
        paymentForm,
        invoiceRows,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = React.useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoiceContext must be used within a InvoiceProvider');
  }
  return context;
};
export default InvoiceProvider;
