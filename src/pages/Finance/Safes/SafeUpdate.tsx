import { Button, Group, Modal, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSafes from '../../../api/finance/useSafes';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import Inputs from './SafesInputs';
import schema from './schema';
type Props = {
  isOpen: boolean;
  requestClose: () => void;
  selectedId: number;
};
const SafeUpdate = (props: Props) => {
  const { data: safes, update, isUpdating } = useSafes();
  const form = useForm<SafeFormValues>({
    validate: yupResolver(schema),
    initialValues: find(props.selectedId, safes),
  });

  async function handleUpdate() {
    try {
      await update(form.values as Safe);
      showNotification({
        message: 'Safe Updated Successfully',
      });
    } catch {
      showNotification({
        message: 'Error Updating safe',
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

export default SafeUpdate;
