import { Stack } from '@mantine/core';
import InvoiceAdd from './InvoicesAdd';
import InvoiceProvider from './controller/InvoiceContext';
import InvoicesTable from './InvoicesTable';
import InvoicesExpenses from './InvoicesExpenses';
import InvoicesControls from './InvoicesControls';
import { useDisclosure } from '@mantine/hooks';
import InvoicesPayment from './InvoicesPayment';

const Invoices = () => {
  const [invoicePayment, invoicePaymentHandlers] = useDisclosure(false);
  return (
    <InvoiceProvider>
      <Stack>
        <InvoiceAdd />
        <InvoicesTable />
        <InvoicesExpenses />
        <InvoicesControls onRecordPayment={invoicePaymentHandlers.open} />
        <InvoicesPayment
          opened={invoicePayment}
          onClose={invoicePaymentHandlers.close}
        />
      </Stack>
    </InvoiceProvider>
  );
};

export default Invoices;
