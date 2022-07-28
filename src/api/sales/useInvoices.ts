import usePost from '../../hooks/usePost';
import useRead from '../../hooks/useRead';
import useRemove from '../../hooks/useRemove';

const useInvoicesQuery = () => {
  const { data } = useRead<Invoice[]>(['invoices'], '/sale-bills');

  return {
    data,
  };
};

const useInvoicesMutation = (invoiceId?: number) => {
  const { post: createInvoice, isPosting: isCreatingInvoice } =
    usePost<InvoiceForm>(['invoices'], '/sale-bills');
  const { post: addToInvoice, isPosting: isAddingInvoice } =
    usePost<InvoiceProductForm>(['invoices'], '/product-to-bill');
  const { post: createExpense, isPosting: isCreatingExpense } = usePost<
    withID<ExpenseForm>
  >(['invoices'], '/sale-bills-extra');
  const { post: recordPayment, isPosting: isRecordingPayment } = usePost<
    withID<PaymentForm>
  >(['invoices'], '/record-payment');
  const { remove: removeInvoice, isRemoving: isRemovingInvoice } = useRemove(
    ['invoices'],
    '/sale-bills'
  );

  const { remove: removeInvoiceProduct, isRemoving: isRemovingInvoiceProduct } =
    useRemove(['invoices'], `/product-to-bill/${invoiceId}`);
  const { post: returnProduct, isPosting: isReturning } =
    usePost<ReturnProductForm>(['invoices'], '/return-invoice');
  return {
    isCreatingInvoice,
    isAddingInvoice,
    createInvoice,
    addToInvoice,
    createExpense,
    isCreatingExpense,
    recordPayment,
    isRecordingPayment,
    removeInvoice,
    isRemovingInvoice,
    removeInvoiceProduct,
    isRemovingInvoiceProduct,
    returnProduct,
    isReturning,
  };
};

export { useInvoicesQuery, useInvoicesMutation };
