import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../../components/FormDivider';
import MoneyInput from '../../../components/MoneyInput';
import useRead from '../../../hooks/useRead';
import useUpdate from '../../../hooks/useUpdate';
import find from '../../../utils/find';
import { BankAddSchema } from './model/schema';
type Props = {
  isOpen: boolean;
  requestClose: () => void;
  selectedId: number;
};
const BankUpdate = (props: Props) => {
  const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
  const { update, isUpdating } = useUpdate<Bank>(['banks'], '/banks');

  const form = useForm<Bank>({
    schema: yupResolver(BankAddSchema),
    initialValues: find(props.selectedId, banks),
  });

  async function handleUpdate() {
    try {
      await update(form.values);
      showNotification({
        message: 'Bank Updated Successfully',
      });
    } catch {
      showNotification({
        message: 'Error Updating bank',
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
          <TextInput
            label="Name"
            placeholder="Enter name"
            {...form.getInputProps('bank_name')}
          />
          <MoneyInput
            label="Balance"
            placeholder="Enter balance"
            hideControls
            {...form.getInputProps('bank_balance')}
          />

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

export default BankUpdate;
