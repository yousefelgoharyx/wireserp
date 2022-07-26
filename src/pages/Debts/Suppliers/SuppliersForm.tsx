import { Button, Group, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSuppliers from '../../../api/debts/useSuppliers';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import Inputs from './Inputs';
import schema from './schema';

const SuppliersForm = () => {
  const form = useForm<SupplierFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      s_name: '',
      indebt_amount: null,
      indebt_type: 'for',
      s_phone: null,
      s_notes: null,
      s_address: null,
      deal_type: null,
      s_email: null,
      s_company: null,
      s_nationality: null,
      s_tax_number: null,
    },
  });

  const { create, isCreating } = useSuppliers();
  async function handleSubmit(values: SupplierFormValues) {
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

export default SuppliersForm;
