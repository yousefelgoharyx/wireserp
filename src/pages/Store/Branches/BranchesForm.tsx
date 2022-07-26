import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useBranches from '../../../api/store/useBranches';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import schema from './schema';

const CatsForm = () => {
  const form = useForm<BranchFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      branch_name: '',
      branch_phone: '',
      branch_address: '',
      commercial_registration_number: '',
    },
  });
  const { create, isCreating } = useBranches();

  async function handleSubmit(values: BranchFormValues) {
    try {
      await create(values);
      showNotification({
        title: 'Success',
        message: 'Branch created successfully',
      });
    } catch (error) {
      showNotification({
        title: 'Success',
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return (
    <FormShell title="Add Branches">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
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
          </FormGrid>
          <FormDivider />

          <Group>
            <Button loading={isCreating} type="submit">
              Add
            </Button>
          </Group>
        </Stack>
      </form>
    </FormShell>
  );
};

export default CatsForm;
