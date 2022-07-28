import { Group, Paper, Stack, Text } from '@mantine/core';
import moneyFormatter from '../../../../utils/moneyFormatter';
import { useInvoiceContext } from './context/InvoiceContext';
import InvoicesExpensesForm from './InvoicesExpensesForm';
import useInvoiceExpenses from './services/useInvoiceExpenses';

const InvoicesExpenses = () => {
  const invoice = useInvoiceContext();
  const invoiceExpenser = useInvoiceExpenses();

  if (!invoice.id) return;
  return (
    <Stack>
      <InvoicesExpensesForm
        onDiscountSubmit={invoiceExpenser.setDiscount}
        onShippingSubmit={invoiceExpenser.setShipping}
        isLoading={invoiceExpenser.isLoading}
      />

      <Paper p={16}>
        <Group>
          <Group>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Full price
            </Text>
            <Text weight={700} size="xl">
              {moneyFormatter(invoice.fullPrice.toString())}
            </Text>
          </Group>
          <Group>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Full price after discounts and shipping
            </Text>
            <Text weight={700} size="xl">
              {moneyFormatter(invoice.fullPriceWithExpenses.toString())}
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
