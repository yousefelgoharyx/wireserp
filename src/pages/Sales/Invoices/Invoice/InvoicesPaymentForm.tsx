import { Button, Stack } from '@mantine/core';
import MoneyInput from '../../../../components/MoneyInput';
import { useInvoiceContext } from './context/InvoiceContext';

type Props = {
  onSubmit: () => void;
  isLoading: boolean;
};
const InvoicesPaymentForm = (props: Props) => {
  const { paymentForm, fullPrice } = useInvoiceContext();
  return (
    <form onSubmit={paymentForm.onSubmit(props.onSubmit)}>
      <Stack>
        <MoneyInput
          label="Amount"
          placeholder="value"
          max={fullPrice}
          {...paymentForm.getInputProps('value')}
        />
        <Button type="submit" loading={props.isLoading}>
          Record payment
        </Button>
      </Stack>
    </form>
  );
};

export default InvoicesPaymentForm;
