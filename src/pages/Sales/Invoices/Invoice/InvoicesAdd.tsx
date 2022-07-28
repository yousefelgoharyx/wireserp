import { useInvoiceContext } from './context/InvoiceContext';
import InvoicesForm from './InvoicesAddForm';
import useInvoiceAdd from './services/useInvoiceAdd';

const InvoiceAdd = () => {
  const invoice = useInvoiceContext();
  const invoiceAdder = useInvoiceAdd();
  return (
    <InvoicesForm
      onSubmit={invoiceAdder.add}
      isLoading={invoiceAdder.isAdding}
      status={invoice.status}
      form={invoice.form}
    />
  );
};

export default InvoiceAdd;
