import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useCategories from '../../../api/store/useCategories';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import schema from './schema';

const CatsForm = () => {
    const form = useForm<CategoryFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            category_name: '',
            type: '',
        },
    });
    const { create, isCreating } = useCategories();

    async function handleSubmit(values: CategoryFormValues) {
        try {
            await create(values);
            showNotification({
                title: 'Success',
                message: 'Category created successfully',
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
        <FormShell title="Add Category">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
                        <TextInput
                            label="Name"
                            placeholder="Category name"
                            {...form.getInputProps('category_name')}
                        />
                        <TextInput
                            label="Type"
                            placeholder="Category type"
                            {...form.getInputProps('type')}
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
