import { Button, NumberInput, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Percentage } from 'tabler-icons-react';
import FormDivider from '../../components/FormDivider';
import useCreate from '../../hooks/useCreate';
import useRead from '../../hooks/useRead';
import getApiError from '../../utils/getApiError';
import { TaxesSchema } from './model/schema';
import SettingsGrid from './SettingsGrid';

const Taxes = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );
  const { create, isCreating } = useCreate<TaxesForm>(
    ['all-settings'],
    '/taxs-settings'
  );
  const form = useForm<TaxesForm>({
    schema: yupResolver(TaxesSchema),
    initialValues: {
      tax_number: +settings[0].tax_number || undefined,
      tax_value_added: +settings[0].tax_value_added || undefined,
      civil_registration_number:
        +settings[0].civil_registration_number || undefined,
    },
  });

  async function handleSubmit() {
    try {
      await create(form.values);
      showNotification({
        message: 'Settings updated successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
      });
    }
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack my={8}>
        <SettingsGrid>
          <NumberInput
            label="Tax number"
            placeholder="Enter..."
            hideControls
            {...form.getInputProps('tax_number')}
          />
          <NumberInput
            label="Tax Value Added"
            placeholder="Enter..."
            hideControls
            icon={<Percentage size={16} />}
            {...form.getInputProps('tax_value_added')}
          />
          <NumberInput
            label="Registration Number"
            placeholder="Enter..."
            hideControls
            {...form.getInputProps('civil_registration_number')}
          />
        </SettingsGrid>
        <FormDivider />
        <Button type="submit" loading={isCreating}>
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default Taxes;
