import { Button, Group, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useClients from '../../../api/debts/useClients';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import Inputs from './Inputs';
import schema from './schema';

const ClientsForm = () => {
  const form = useForm<ClientForm>({
    validate: yupResolver(schema),
    initialValues: {
      c_name: '',
      releated_user: null,
      indebt_amount: undefined,
      indebt_type: 'for',
      c_phone: '',
      c_notes: '',
      c_address: '',
      deal_type: null,
      c_email: '',
      c_company: '',
      c_nationality: '',
      c_tax_number: undefined,
    },
  });

  const { create, isCreating } = useClients();
  async function handleSubmit(values: ClientForm) {
    try {
      await create(values);
      showNotification({
        message: 'Client Created Successfully',
      });
      form.reset();
    } catch (error) {
      showNotification({
        message: 'Error Creating Client',
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

export default ClientsForm;
