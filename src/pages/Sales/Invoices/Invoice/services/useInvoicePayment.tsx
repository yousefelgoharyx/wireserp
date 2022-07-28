import { showNotification } from '@mantine/notifications';
import { useInvoicesMutation } from '../../../../../api/sales/useInvoices';
import getApiError from '../../../../../utils/getApiError';
import { useInvoiceContext } from '../context/InvoiceContext';

const useInvoicePayment = () => {
  const invoice = useInvoiceContext();
  const invoiceService = useInvoicesMutation();

  async function recordPayment() {
    try {
      await invoiceService.recordPayment({
        id: invoice.id,
        ...invoice.paymentForm.values,
      });
      invoice.setPayment(invoice.paymentForm.values.value);
      showNotification({ message: 'Payment recorded' });
    } catch (error) {
      invoice.setPayment(0);
      invoice.paymentForm.setFieldError('value', 0);
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  return {
    recordPayment,
    isLoading: invoiceService.isRecordingPayment,
  };
};

export default useInvoicePayment;
