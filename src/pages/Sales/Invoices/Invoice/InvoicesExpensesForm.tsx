import {
  Alert,
  Button,
  Group,
  InputWrapper,
  NumberInput,
  Select,
  SimpleGrid,
} from '@mantine/core';
import { Percentage } from 'tabler-icons-react';
import useSettings from '../../../../api/useSettings';
import FormShell from '../../../../components/FormShell';
import MoneyInput from '../../../../components/MoneyInput';
import { isValue } from '../../../../utils/all';
import { useInvoiceContext } from './context/InvoiceContext';

function getExpensesList(currency: string): ExpenseSelectItem[] {
  return [
    { label: 'Percent', value: 'percent' },
    { label: currency, value: 'currency' },
  ];
}

type Props = {
  onDiscountSubmit: () => void;
  onShippingSubmit: () => void;
  isLoading: boolean;
};

const InvoicesExpensesForm = (props: Props) => {
  const settings = useSettings();
  const invoice = useInvoiceContext();
  return (
    <FormShell title="More expenses">
      {invoice.payment !== 0 && (
        <Alert mb={16} title="Note">
          Recorded payment should be 0 to be able to create discount or shipping
        </Alert>
      )}
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        <form onSubmit={invoice.discountForm.onSubmit(props.onDiscountSubmit)}>
          <InputWrapper label="Discout">
            <Group noWrap spacing={8}>
              <Select
                disabled={invoice.payment !== 0}
                sx={{ width: 96, flexShrink: 0 }}
                placeholder="Select"
                data={getExpensesList(settings.currency)}
                {...invoice.discountForm.getInputProps('action_type')}
              />
              {invoice.discountForm.values.action_type === 'percent' ? (
                <NumberInput
                  disabled={invoice.payment !== 0}
                  sx={{ flexGrow: 1 }}
                  max={100}
                  min={0}
                  hideControls
                  placeholder="Discount"
                  icon={<Percentage size={16} />}
                  {...invoice.discountForm.getInputProps('value')}
                />
              ) : (
                <MoneyInput
                  disabled={invoice.payment !== 0}
                  sx={{ flexGrow: 1 }}
                  placeholder="Discount"
                  {...invoice.discountForm.getInputProps('value')}
                />
              )}

              <Button
                disabled={invoice.payment !== 0}
                loading={props.isLoading}
                type="submit"
              >
                Apply
              </Button>
            </Group>
          </InputWrapper>
        </form>

        <form onSubmit={invoice.shippingForm.onSubmit(props.onShippingSubmit)}>
          <InputWrapper label="Shipping">
            <Group noWrap spacing={8}>
              <Select
                disabled={invoice.payment !== 0}
                sx={{ width: 96, flexShrink: 0 }}
                placeholder="Select"
                data={getExpensesList(settings.currency)}
                {...invoice.shippingForm.getInputProps('action_type')}
              />
              {invoice.shippingForm.values.action_type === 'percent' ? (
                <NumberInput
                  disabled={invoice.payment !== 0}
                  sx={{ flexGrow: 1 }}
                  max={100}
                  min={0}
                  hideControls
                  placeholder="Shipping"
                  icon={<Percentage size={16} />}
                  {...invoice.shippingForm.getInputProps('value')}
                />
              ) : (
                <MoneyInput
                  disabled={invoice.payment !== 0}
                  sx={{ flexGrow: 1 }}
                  placeholder="Shipping"
                  {...invoice.shippingForm.getInputProps('value')}
                />
              )}
              <Button
                disabled={invoice.payment !== 0}
                loading={props.isLoading}
                type="submit"
              >
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
