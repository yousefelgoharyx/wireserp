import { showNotification } from '@mantine/notifications';
import { useInvoicesMutation } from '../../../../../api/sales/useInvoices';
import getApiError from '../../../../../utils/getApiError';
import { useInvoiceContext } from '../context/InvoiceContext';

const useInvoiceExpenses = () => {
  const invoice = useInvoiceContext();
  const { createExpense, isCreatingExpense } = useInvoicesMutation();

  async function setDiscount() {
    try {
      await createExpense({
        id: invoice.id,
        ...invoice.discountForm.values,
      });
      invoice.setDiscount(invoice.discountForm.values.value);
      invoice.setDiscountType(invoice.discountForm.values.action_type);
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
      await createExpense({
        id: invoice.id,
        ...invoice.shippingForm.values,
      });
      invoice.setShipping(invoice.shippingForm.values.value);
      invoice.setShippingType(invoice.shippingForm.values.action_type);
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
    isLoading: isCreatingExpense,
  };
};

export default useInvoiceExpenses;
