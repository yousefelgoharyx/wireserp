import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import useBranches from '../../../api/store/useBranches';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import schema from './schema';
import { showNotification } from '@mantine/notifications';
import getApiError from '../../../utils/getApiError';
type Props = {
  isOpen: boolean;
  requestClose: () => void;
  selectedId: number;
};
const CatsUpdate = (props: Props) => {
  const { update, isUpdating, data } = useBranches();

  const form = useForm<Branch>({
    validate: yupResolver(schema),
    initialValues: find(props.selectedId, data),
  });

  async function handleUpdate(branch: Branch) {
    const branchUpdate: BranchUpdate = {
      branch_address: branch.branch_address,
      branch_id: branch.id,
      branch_name: branch.branch_name,
      branch_phone: branch.branch_phone,
      commercial_registration_number: branch.commercial_registration_number,
      company_id: branch.company_id,
    };
    try {
      await update(branchUpdate);
      showNotification({
        message: 'Branch updated successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
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
            required
            label="Name"
            {...form.getInputProps('branch_name')}
          />
          <TextInput
            required
            label="Phone"
            {...form.getInputProps('branch_phone')}
          />
          <TextInput
            required
            label="Address"
            {...form.getInputProps('branch_address')}
          />
          <TextInput
            label="Registration Number"
            {...form.getInputProps('commercial_registration_number')}
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

export default CatsUpdate;
