import { useInvoiceContext } from './controller/InvoiceContext';
import InvoicesExpensesForm from './InvoicesExpensesForm';
import useInvoiceExpenses from './services/useInvoiceExpenses';

const InvoicesExpenses = () => {
  const invoice = useInvoiceContext();
  const invoiceExpenser = useInvoiceExpenses();
  if (!invoice.id) return;
  return (
    <InvoicesExpensesForm
      discountForm={invoice.discountForm}
      shippingForm={invoice.shippingForm}
      onDiscountSubmit={invoiceExpenser.setDiscount}
      onShippingSubmit={invoiceExpenser.setShipping}
      isLoading={invoiceExpenser.isLoading}
    />
  );
};

export default InvoicesExpenses;
