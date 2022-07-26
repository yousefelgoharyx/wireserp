import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useCategories from '../../../api/store/useCategories';
import useSubCats from '../../../api/store/useSubCats';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import schema from './schema';

const SubCatsForm = () => {
  const form = useForm<SubCategoryFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      category_id: null,
      sub_category_name: '',
    },
  });
  const { create, isCreating } = useSubCats();
  const { data: categories } = useCategories();
  async function handleSubmit(values: SubCategoryFormValues) {
    try {
      await create(values);
      showNotification({
        title: 'Success',
        message: 'Sub category created successfully',
      });
      form.reset();
    } catch (error) {
      showNotification({
        title: 'Success',
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  return (
    <FormShell title="Add Sub category">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <FormGrid>
            <TextInput
              label="Name"
              placeholder="Sub Category name"
              {...form.getInputProps('sub_category_name')}
            />
            <Select
              data={categories.map((cat) => ({
                label: cat.category_name,
                value: cat.id.toString(),
              }))}
              label="Category"
              placeholder="Select category"
              {...form.getInputProps('category_id')}
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

export default SubCatsForm;
