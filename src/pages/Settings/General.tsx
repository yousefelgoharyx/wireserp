import {
  Button,
  InputWrapper,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FileInput from '../../components/FileInput';
import FormDivider from '../../components/FormDivider';
import FormGrid from '../../components/FormGrid';
import useCreate from '../../hooks/useCreate';
import useRead from '../../hooks/useRead';
import { baseURL } from '../../utils/axios';
import getApiError from '../../utils/getApiError';
import { GeneralSchema } from './model/schema';
import SettingsGrid from './SettingsGrid';
function getFormData(object) {
  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    formData.append(key, object[key]);
  });
  return formData;
}
const General = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );

  const form = useForm<GeneralForm>({
    schema: yupResolver(GeneralSchema),
    initialValues: {
      name: settings[0].name || '',
      business_field: settings[0].business_field || '',
      founder_name: settings[0].founder_name || '',
      address: settings[0].address || '',
      phone: settings[0].phone || '',
      logo: settings[0].logo ? baseURL + settings[0].logo : null,
      stamp: settings[0].company_stamp
        ? baseURL + settings[0].company_stamp
        : null,
    },
  });
  const { create, isCreating } = useCreate<FormData>(
    ['general-settings'],
    '/main-settings'
  );

  async function handleSubmit() {
    const newForm: GeneralForm = {
      ...form.values,
    };
    if (typeof newForm.logo === 'string') newForm.logo = '';
    if (typeof newForm.stamp === 'string') newForm.stamp = '';
    try {
      await create(getFormData(newForm));
      showNotification({
        message: 'Settings updated successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  return (
    <Stack my={8}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <SettingsGrid>
            <TextInput
              label="Name"
              placeholder="Enter..."
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Founder's name"
              placeholder="Enter..."
              {...form.getInputProps('founder_name')}
            />
            <TextInput
              label="Bussiness field"
              placeholder="Enter..."
              {...form.getInputProps('business_field')}
            />
            <TextInput
              label="Address"
              placeholder="Enter..."
              {...form.getInputProps('address')}
            />
            <TextInput
              label="Phone"
              placeholder="Enter..."
              {...form.getInputProps('phone')}
            />
          </SettingsGrid>
          <FormGrid>
            <InputWrapper label="Logo" {...form.getInputProps('logo')}>
              <FileInput
                value={form.values.logo}
                onChange={(file) => {
                  form.setFieldValue('logo', file);
                }}
              />
            </InputWrapper>
            <InputWrapper label="Stamp" {...form.getInputProps('stamp')}>
              <FileInput
                value={form.values.stamp}
                onChange={(file) => {
                  form.setFieldValue('stamp', file);
                }}
              />
            </InputWrapper>
          </FormGrid>
          <FormDivider />
          <Button loading={isCreating} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default General;
