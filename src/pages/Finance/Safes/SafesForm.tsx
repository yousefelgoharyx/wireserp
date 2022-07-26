import { Button, Group, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSafes from '../../../api/finance/useSafes';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import Inputs from './SafesInputs';
import schema from './schema';

const SafeForm = () => {
  const form = useForm<SafeFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      safe_name: '',
      branch_id: null,
      safe_balance: undefined,
      safe_type: '',
    },
  });

  const { create, isCreating } = useSafes();
  async function handleSubmit(values: SafeFormValues) {
    try {
      await create(values);
      showNotification({
        message: 'Safe added successfully',
      });
      form.reset();
    } catch (error) {
      showNotification({
        message: 'Error creating safe',
        color: 'red',
      });
    }
  }
  return (
    <FormShell title="Add Client">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
            <Inputs form={form} />
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

export default SafeForm;
