import { showNotification } from '@mantine/notifications';
import usePost from '../../../../hooks/usePost';
import getApiError from '../../../../utils/getApiError';
import { useInvoiceContext } from '../controller/InvoiceContext';

const useInvoicePayment = () => {
  const invoice = useInvoiceContext();
  const { post, isPosting } = usePost<PaymentForm>(
    ['invoices'],
    '/record-payment'
  );

  async function recordPayment() {
    try {
      await post(invoice.paymentForm.values);
      showNotification({ message: 'Payment recorded' });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  return {
    recordPayment,
    isLoading: isPosting,
  };
};

export default useInvoicePayment;
