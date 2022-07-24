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
import useCreate from '../../hooks/useCreate';
import useRead from '../../hooks/useRead';
import getApiError from '../../utils/getApiError';
import { GeneralSettingsSchema } from './model/schema';
import SettingsGrid from './SettingsGrid';
function getFormData(object) {
  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    if (object[key]) formData.append(key, object[key]);
  });
  return formData;
}
const General = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );

  const form = useForm<GeneralSettingsForm>({
    schema: yupResolver(GeneralSettingsSchema),
    initialValues: {
      name: settings[0].name,
      business_field: settings[0].business_field,
      founder_name: '',
      address: '',
      phone: settings[0].phone,
      logo: settings[0].logo,
      stamp: settings[0].company_stamp,
    },
  });
  const { create, isCreating } = useCreate<FormData>(
    ['general-settings'],
    '/main-settings'
  );

  async function handleSubmit() {
    try {
      await create(getFormData(form.values));
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
          <SimpleGrid cols={2}>
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
          </SimpleGrid>
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
