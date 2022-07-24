import { Button, Select, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../components/FormDivider';
import FormGrid from '../../components/FormGrid';
import useContries from '../../hooks/useContries';
import useCreate from '../../hooks/useCreate';
import useCurrencies from '../../hooks/useCurrencies';
import useRead from '../../hooks/useRead';
import getApiError from '../../utils/getApiError';
import { ExtraSettingsSchema } from './model/schema';

const Extra = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );
  const { countriesSelect } = useContries();
  const currencies = useCurrencies();

  const form = useForm<ExtraSettingsForm>({
    schema: yupResolver(ExtraSettingsSchema),
    initialValues: {
      country: settings[0].country ?? null,
      currency: settings[0].currency ?? null,
    },
  });
  const { create, isCreating } = useCreate<ExtraSettingsForm>(
    ['all-settings'],
    '/extra-settings'
  );
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
        <FormGrid>
          <Select
            label="Currency"
            placeholder="Select currency"
            data={currencies}
            {...form.getInputProps('currency')}
          />
          <Select
            label="Country"
            placeholder="Select country"
            data={countriesSelect}
            {...form.getInputProps('country')}
          />
        </FormGrid>
        <FormDivider />
        <Button type="submit" loading={isCreating}>
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default Extra;
