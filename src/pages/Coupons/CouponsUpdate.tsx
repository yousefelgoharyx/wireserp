import { Button, Group, Modal, Stack } from '@mantine/core';
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
  const { update, isUpdating } = useUpdate<CouponUpdate>(
    ['coupons'],
    '/coupons'
  );
  const currentCoupon = find(props.selectedId, coupons);
  const form = useForm<CouponForm>({
    validate: yupResolver(CouponFormSchema),
    initialValues: {
      code: currentCoupon.code,
      discount: currentCoupon.discount,
      expire_date: new Date(currentCoupon.expire_date),
      section: currentCoupon.section,
      item_id: currentCoupon.item_id,
    },
  });

  async function handleUpdate() {
    const coupon = {
      ...form.values,
      id: currentCoupon.id,
    };
    try {
      await update(coupon);
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
