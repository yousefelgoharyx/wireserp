import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../components/FormDivider';
import useRead from '../../hooks/useRead';
import useUpdate from '../../hooks/useUpdate';
import find from '../../utils/find';
import getApiError from '../../utils/getApiError';
import Inputs from './Inputs';
import { CouponFormSchema } from './model/schema';

const CouponsUpdate = (props: UpdateModal) => {
  const { data: coupons } = useRead<Coupon[]>(['coupons'], '/coupons');
  const { update, isUpdating } = useUpdate<Coupon>(['coupons'], '/coupons');
  const form = useForm<Coupon>({
    schema: yupResolver(CouponFormSchema),
    initialValues: {
      ...find(props.selectedId, coupons),
      expire_date: new Date(find(props.selectedId, coupons).expire_date),
    },
  });

  async function handleUpdate() {
    try {
      await update(form.values);
      showNotification({
        message: 'Coupon Updated Successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
      });
    }
    props.requestClose();
  }

  return (
    <Modal
      centered
      opened={props.isOpen}
      onClose={props.requestClose}
      withCloseButton={false}
    >
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <Stack>
          <Inputs form={form} />
          <FormDivider />
          <Group>
            <Button loading={isUpdating} type="submit">
              Update
            </Button>
            <Button variant="light" onClick={props.requestClose}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CouponsUpdate;
