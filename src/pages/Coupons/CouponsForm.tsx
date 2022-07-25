import { Button, Stack } from '@mantine/core';
import { yupResolver, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../components/FormDivider';
import FormGrid from '../../components/FormGrid';
import FormShell from '../../components/FormShell';
import useCreate from '../../hooks/useCreate';
import getApiError from '../../utils/getApiError';
import Inputs from './Inputs';
import { CouponFormSchema } from './model/schema';

const CouponsForm = () => {
  const form = useForm<CouponForm>({
    schema: yupResolver(CouponFormSchema),
    initialValues: {
      code: '',
      discount: undefined,
      expire_date: new Date(),
      section: 'clients',
      item_id: null,
    },
  });

  const { create, isCreating } = useCreate<any>(['coupons'], '/coupons');

  async function handleSubmit() {
    try {
      await create(form.values);
      showNotification({
        message: 'Coupon created',
      });
      form.reset();
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  return (
    <FormShell title="Add coupon">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
            <Inputs form={form} />
          </FormGrid>
          <FormDivider />
          <Button loading={isCreating} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </FormShell>
  );
};

export default CouponsForm;
