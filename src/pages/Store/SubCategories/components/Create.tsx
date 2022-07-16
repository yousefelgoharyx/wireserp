import {
    Button,
    Group,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../../components/FormDivider';
import FormShell from '../../../../components/FormShell';
import { useSubCategories } from '../Provider';
import schema from '../schema';
import useGetCategories from '../../../../api/useGetCategories';
const Create = () => {
    const { create, isCreating } = useSubCategories();
    const { data: categories } = useGetCategories();
    const form = useForm<SubCategoryFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            category_id: undefined,
            sub_category_name: '',
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
                            required
                            label="Category Name"
                            placeholder="Type..."
                            {...form.getInputProps('sub_category_name')}
                        />
                        <Select
                            label="Category"
                            placeholder="Select Category"
                            data={categories.map((cat) => ({
                                label: cat.category_name,
                                value: cat.id.toString(),
                            }))}
                            {...form.getInputProps('category_id')}
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
