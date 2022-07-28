import { Button, Group } from '@mantine/core';
import { useInvoiceContext } from './context/InvoiceContext';
import useInvoiceRemove from './services/useInvoiceRemove';

type Props = {
  onRecordPayment: () => void;
};
const InvoicesControls = (props: Props) => {
  const invoice = useInvoiceContext();
  const invoiceRemover = useInvoiceRemove();
  if (!invoice.id) return;
  return (
    <Group>
      <Button>Print</Button>
      <Button color="gray" onClick={props.onRecordPayment}>
        Record
      </Button>
      <Button
        loading={invoiceRemover.isRemovingInvoice}
        onClick={invoiceRemover.removeInvoice}
        color="red"
      >
        Cancel Invoice
      </Button>
    </Group>
  );
};

export default InvoicesControls;
