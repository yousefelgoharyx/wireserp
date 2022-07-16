import { Button, Group, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../../components/FormDivider';
import FormShell from '../../../../components/FormShell';
import { useCategories } from '../Provider';
import schema from '../schema';
const Create = () => {
    const { create, isCreating } = useCategories();
    const form = useForm<CategoryFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            category_name: '',
            type: '',
        },
    });

    return (
        <FormShell title="Add Branch">
            <form onSubmit={form.onSubmit(create)}>
                <Stack>
                    <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    >
                        <TextInput
                            label="Category Name"
                            placeholder="Type..."
                            {...form.getInputProps('category_name')}
                        />
                        <TextInput
                            label="Category Type"
                            placeholder="Type..."
                            {...form.getInputProps('type')}
                        />
                    </SimpleGrid>

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

export default Create;
