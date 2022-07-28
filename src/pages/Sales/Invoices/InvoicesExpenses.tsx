import { Group, Paper, Stack, Text } from '@mantine/core';
import moneyFormatter from '../../../utils/moneyFormatter';
import { useInvoiceContext } from './context/InvoiceContext';
import { getExpensePrice } from './context/invoiceUtils';
import InvoicesExpensesForm from './InvoicesExpensesForm';
import useInvoiceExpenses from './services/useInvoiceExpenses';

const InvoicesExpenses = () => {
  const invoice = useInvoiceContext();
  const invoiceExpenser = useInvoiceExpenses();
  if (!invoice.id) return;
  console.log(invoice.discountType);

  const totalPrice: number = invoice.invoiceRows.reduce(
    (acc, row) => acc + row.total_price,
    0
  );
  return (
    <Stack>
      <InvoicesExpensesForm
        discountForm={invoice.discountForm}
        shippingForm={invoice.shippingForm}
        onDiscountSubmit={invoiceExpenser.setDiscount}
        onShippingSubmit={invoiceExpenser.setShipping}
        isLoading={invoiceExpenser.isLoading}
      />
      <Paper p={16}>
        <Group>
          <Group>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Final price after discounts and shipping
            </Text>
            <Text weight={700} size="xl">
              {moneyFormatter(
                (
                  totalPrice -
                  getExpensePrice(
                    totalPrice,
                    invoice.discount,
                    invoice.discountType
                  ) +
                  getExpensePrice(
                    totalPrice,
                    invoice.shipping,
                    invoice.shippingType
                  )
                ).toString()
              )}
            </Text>
          </Group>
          <Group>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Recorded Payment
            </Text>
            <Text weight={700} size="xl">
              {moneyFormatter(invoice.payment.toString())}
            </Text>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
};

export default InvoicesExpenses;
