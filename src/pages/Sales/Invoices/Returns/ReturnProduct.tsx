import {
  Button,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useInvoicesMutation,
  useInvoicesQuery,
} from '../../../../api/sales/useInvoices';
import { useReturnsMutation } from '../../../../api/sales/useReturns';
import { useProductsList } from '../../../../api/store/useProducts';
import CountOfInput from '../../../../components/CountOfInput';
import FormDivider from '../../../../components/FormDivider';
import FormGrid from '../../../../components/FormGrid';
import FormShell from '../../../../components/FormShell';
import getApiError from '../../../../utils/getApiError';
import { ReturnProductSchema } from './model/schema';

const ReturnProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnService = useReturnsMutation();
  const { data: invoices } = useInvoicesQuery();
  const state = location.state as ReturnProductState;
  const invoice = invoices.find((invoice) => invoice.id === state?.id);
  const product = invoice.products.find(
    (product) => product.product_id === state?.product_id
  );

  const form = useForm<ReturnProductForm>({
    validate: yupResolver(ReturnProductSchema),
    initialValues: {
      id: state?.id,
      product_id: state?.product_id,
      date_time: new Date(),
      notes: '',
      quantity: undefined,
    },
  });
  function handleTimeChange(v: Date) {
    const timeDate = dayjs(v);
    const date = dayjs(form.values.date_time)
      .hour(timeDate.hour())
      .minute(timeDate.minute())
      .second(timeDate.second())
      .millisecond(timeDate.millisecond());
    form.setFieldValue('date_time', date.toDate());
  }
  async function handleReturn() {
    try {
      await returnService.returnProduct(form.values);
      navigate('/invoices/returns');
      showNotification({
        message: 'Product returned successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  if (!state) return <Text>How did you get here?</Text>;

  return (
    <Stack>
      <FormShell title="Return product">
        <form onSubmit={form.onSubmit(handleReturn)}>
          <Stack>
            <FormGrid>
              <Select
                label="Product"
                disabled={true}
                data={[
                  {
                    label: product.product_name,
                    value: product.product_id.toString(),
                  },
                ]}
                value={product.product_id.toString()}
              />
              <NumberInput
                label="Quantity"
                placeholder="Enter quantity"
                hideControls
                precision={0}
                min={1}
                rightSection={<CountOfInput count={product.quantity} />}
                {...form.getInputProps('quantity')}
              />
              <DatePicker
                label="Return date"
                placeholder="Select date"
                {...form.getInputProps('date_time')}
              />
              <TimeInput
                label="Return time"
                placeholder="Enter time"
                {...form.getInputProps('date_time')}
                onChange={handleTimeChange}
              />
              <TextInput
                label="Notes"
                placeholder="Enter notes"
                {...form.getInputProps('notes')}
              />
            </FormGrid>
            <FormDivider />
            <Button loading={returnService.isReturning} type="submit">
              Return
            </Button>
          </Stack>
        </form>
      </FormShell>
    </Stack>
  );
};

export default ReturnProduct;
