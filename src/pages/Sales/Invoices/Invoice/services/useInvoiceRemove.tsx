import { showNotification, updateNotification } from '@mantine/notifications';
import { Check, Error404 } from 'tabler-icons-react';
import { useInvoicesMutation } from '../../../../../api/sales/useInvoices';
import getApiError from '../../../../../utils/getApiError';
import { useInvoiceContext } from '../context/InvoiceContext';

const useInvoiceRemove = () => {
  const invoice = useInvoiceContext();
  const invoiceService = useInvoicesMutation(invoice.id);

  async function removeInvoice() {
    showNotification({
      id: 'remove-invoice',
      loading: true,
      message: 'Removing invoice',
      color: 'red',
      autoClose: false,
      disallowClose: true,
    });
    try {
      await invoiceService.removeInvoice(invoice.id);
      invoice.setId(null);
      invoice.setItems([]);
      invoice.setStatus('creating');
      invoice.form.reset();
      invoice.discountForm.reset();
      invoice.shippingForm.reset();
      updateNotification({
        id: 'remove-invoice',
        message: 'Invoice removed',
        icon: <Check size={16} />,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id: 'remove-invoice',
        message: getApiError(error.response.data),
        icon: <Error404 size={16} />,
        autoClose: 2000,
      });
    }
  }
  async function removeInvoiceProduct(id: number) {
    showNotification({
      id: 'remove-invoice-product',
      loading: true,
      message: 'Removing product from invoice',
      color: 'red',
      autoClose: false,
      disallowClose: true,
    });
    try {
      await invoiceService.removeInvoiceProduct(id);
      invoice.setItems(invoice.items.filter((item) => item.product_id !== id));
      updateNotification({
        id: 'remove-invoice-product',
        message: 'Product removed from invoice',
        icon: <Check size={16} />,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id: 'remove-invoice-product',
        message: getApiError(error.response.data),
        icon: <Error404 size={16} />,
        autoClose: 2000,
      });
    }
  }
  return {
    removeInvoice,
    removeInvoiceProduct,
    isRemovingInvoice: invoiceService.isRemovingInvoice,
    isRemovingInvoiceProduct: invoiceService.isRemovingInvoiceProduct,
  };
};

export default useInvoiceRemove;
