import { showNotification } from '@mantine/notifications';
import usePost from '../../../../hooks/usePost';
import getApiError from '../../../../utils/getApiError';
import { useInvoiceContext } from '../controller/InvoiceContext';

const useInvoiceExpenses = () => {
  const invoice = useInvoiceContext();
  const expenses = usePost<ExpenseForm>(['invoices'], '/sale-bills-extra');

  async function setDiscount() {
    try {
      await expenses.post(invoice.discountForm.values);
      showNotification({ message: 'Discount added' });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  async function setShipping() {
    try {
      await expenses.post(invoice.shippingForm.values);
      showNotification({ message: 'Shipping added' });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return {
    setDiscount,
    setShipping,
    isLoading: expenses.isPosting,
  };
};

export default useInvoiceExpenses;
