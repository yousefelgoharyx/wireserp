import { Button, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import MoneyInput from '../../../components/MoneyInput';

type Props = {
  onSubmit: () => void;
  form: UseFormReturnType<PaymentForm>;
  isLoading: boolean;
};
const InvoicesPaymentForm = (props: Props) => {
  console.log(props.form);

  return (
    <form onSubmit={props.form.onSubmit(props.onSubmit)}>
      <Stack>
        <MoneyInput
          label="Amount"
          placeholder="value"
          {...props.form.getInputProps('value')}
        />
        <Button type="submit" loading={props.isLoading}>
          Record payment
        </Button>
      </Stack>
    </form>
  );
};

export default InvoicesPaymentForm;
