import { showNotification } from '@mantine/notifications';
import usePost from '../../../../../hooks/usePost';
import getApiError from '../../../../../utils/getApiError';
import { useInvoiceContext } from '../context/InvoiceContext';

const useInvoicePayment = () => {
  const invoice = useInvoiceContext();
  const { post, isPosting } = usePost<withID<PaymentForm>>(
    ['invoices'],
    '/record-payment'
  );

  async function recordPayment() {
    try {
      await post({
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
    isLoading: isPosting,
  };
};

export default useInvoicePayment;
