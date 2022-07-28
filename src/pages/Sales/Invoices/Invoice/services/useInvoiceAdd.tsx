import { showNotification } from '@mantine/notifications';
import usePost from '../../../../../hooks/usePost';
import getApiError from '../../../../../utils/getApiError';
import { useInvoiceContext } from '../context/InvoiceContext';

const useInvoiceAdd = () => {
  const { post: createInvoice, isPosting: isCreatingInvoice } =
    usePost<InvoiceForm>(['invoices'], '/sale-bills');
  const { post: addToInvoice, isPosting: isAddingInvoice } =
    usePost<InvoiceProductForm>(['invoices'], '/product-to-bill');

  const invoice = useInvoiceContext();

  async function add(values: InvoiceForm) {
    const invoiceProduct: InvoiceProductForm = {
      product_id: values.product_id,
      product_price: values.product_price,
      quantity: values.quantity,
      quantity_price: values.quantity_price,
      final_total: values.final_total,
      sale_bill_id: invoice.id,
      unit: values.unit,
    };

    try {
      if (invoice.id) {
        await addToInvoice(invoiceProduct);
        invoice.setItems([...invoice.items, values]);
        showNotification({ message: 'Added product to invoice' });
      } else {
        const response = await createInvoice(values);
        console.log(response);
        invoice.setStatus('adding');
        invoice.setId(response.id);
        invoice.setItems([...invoice.items, values]);
        showNotification({ message: 'Invoice created successfully' });
      }
      invoice.form.setValues({
        ...invoice.form.values,
        product_id: null,
        product_price: undefined,
        quantity: undefined,
        quantity_price: undefined,
        final_total: undefined,
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return {
    add,
    isAdding: isCreatingInvoice || isAddingInvoice,
  };
};

export default useInvoiceAdd;
