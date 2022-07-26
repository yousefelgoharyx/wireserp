import { Button, Group, Modal, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useClients from '../../../api/debts/useClients';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import Inputs from './Inputs';
import schema from './schema';
type Props = {
  isOpen: boolean;
  requestClose: () => void;
  selectedId: number;
};
const ClientUpdate = (props: Props) => {
  const { data: clients, update, isUpdating } = useClients();
  const form = useForm<ClientForm>({
    validate: yupResolver(schema),
    initialValues: find(props.selectedId, clients),
  });

  async function handleUpdate() {
    try {
      await update(form.values as Client);
      showNotification({
        message: 'Client Updated Successfully',
      });
    } catch {
      showNotification({
        message: 'Error Updating Client',
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

export default ClientUpdate;
