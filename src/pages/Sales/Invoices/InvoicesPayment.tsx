import { Modal } from '@mantine/core';
import { useInvoiceContext } from './controller/InvoiceContext';
import InvoicesPaymentForm from './InvoicesPaymentForm';
import useInvoicePayment from './services/useInvoicePayment';

type Props = {
  opened: boolean;
  onClose: () => void;
};
const InvoicesPayment = (props: Props) => {
  const invoice = useInvoiceContext();
  const invoicePayment = useInvoicePayment();
  return (
    <Modal
      title="Record Payment"
      centered
      opened={props.opened}
      onClose={props.onClose}
    >
      <InvoicesPaymentForm
        form={invoice.paymentForm}
        isLoading={invoicePayment.isLoading}
        onSubmit={async () => {
          await invoicePayment.recordPayment();
          props.onClose();
        }}
      />
    </Modal>
  );
};

export default InvoicesPayment;
