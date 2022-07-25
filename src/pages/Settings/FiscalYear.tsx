import { Button, NumberInput, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../components/FormDivider';
import useCreate from '../../hooks/useCreate';
import useRead from '../../hooks/useRead';
import getApiError from '../../utils/getApiError';
import mapRequest from '../../utils/mapRequest';
import { FiscalYearSchema } from './model/schema';
import SettingsGrid from './SettingsGrid';
const FiscalYear = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );
  const { create, isCreating } = useCreate<FiscalYearForm>(
    ['all-settings'],
    '/fiscal-settings'
  );
  const form = useForm<FiscalYearForm>({
    schema: yupResolver(FiscalYearSchema),
    initialValues: {
      fiscal_year: +settings[0].fiscal_year ?? null,
      start_date: new Date(settings[0].fiscal_start_date),
      end_date: new Date(settings[0].fiscal_end_date),
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
            label="Fiscal year"
            placeholder="Enter a year"
            hideControls
            {...form.getInputProps('fiscal_year')}
          />
          <DatePicker
            label="Start date"
            placeholder="Select date"
            {...form.getInputProps('start_date')}
          />
          <DatePicker
            label="End date"
            placeholder="Select date"
            {...form.getInputProps('end_date')}
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

export default FiscalYear;
