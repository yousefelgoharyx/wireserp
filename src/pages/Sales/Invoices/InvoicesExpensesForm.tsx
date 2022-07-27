import { Button, Group, InputWrapper, Select, SimpleGrid } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import useSettings from '../../../api/useSettings';
import FormShell from '../../../components/FormShell';
import MoneyInput from '../../../components/MoneyInput';

function getExpensesList(currency: string): ExpenseSelectItem[] {
  return [
    { label: 'Percent', value: 'percent' },
    { label: currency, value: 'currency' },
  ];
}

type Props = {
  onDiscountSubmit: () => void;
  onShippingSubmit: () => void;
  discountForm: UseFormReturnType<ExpenseForm>;
  shippingForm: UseFormReturnType<ExpenseForm>;
  isLoading: boolean;
};

const InvoicesExpensesForm = (props: Props) => {
  const settings = useSettings();
  return (
    <FormShell title="More expenses">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        <form onSubmit={props.discountForm.onSubmit(props.onDiscountSubmit)}>
          <InputWrapper label="Discout">
            <Group noWrap spacing={8}>
              <Select
                sx={{ width: 96 }}
                placeholder="Select"
                data={getExpensesList(settings.currency)}
                {...props.discountForm.getInputProps('action_type')}
              />
              <MoneyInput
                sx={{ flexGrow: 1 }}
                placeholder="Discount"
                {...props.discountForm.getInputProps('value')}
              />
              <Button loading={props.isLoading} type="submit">
                Apply
              </Button>
            </Group>
          </InputWrapper>
        </form>

        <form onSubmit={props.shippingForm.onSubmit(props.onShippingSubmit)}>
          <InputWrapper label="Shipping">
            <Group noWrap spacing={8}>
              <Select
                sx={{ width: 96 }}
                placeholder="Select"
                data={getExpensesList(settings.currency)}
                {...props.shippingForm.getInputProps('action_type')}
              />
              <MoneyInput
                sx={{ flexGrow: 1 }}
                placeholder="Shipping cost"
                {...props.shippingForm.getInputProps('value')}
              />
              <Button loading={props.isLoading} type="submit">
                Apply
              </Button>
            </Group>
          </InputWrapper>
        </form>
      </SimpleGrid>
    </FormShell>
  );
};

export default InvoicesExpensesForm;
