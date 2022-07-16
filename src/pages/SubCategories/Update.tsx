import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../components/FormDivider';
import { useSubCategories } from './SubCategoriesContext';
import branchSchema from './schemas/schema';
import { SubCategory } from 'subcategories';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const Update = (props: Props) => {
    const { get, update, isUptading, categories } = useSubCategories();

    const form = useForm<SubCategory>({
        schema: yupResolver(branchSchema),
        initialValues: get(props.selectedId),
    });
    console.log(form);

    async function handleUpdate(data: SubCategory) {
        await update(data);
        props.requestClose();
    }

    return (
        <Modal
            centered
            opened={props.isOpen}
            onClose={props.requestClose}
            withCloseButton={false}
        >
            <form onSubmit={form.onSubmit(handleUpdate)}>
                <Stack>
                    <TextInput
                        label="Category Name"
                        placeholder="Type..."
                        {...form.getInputProps('sub_category_name')}
                    />
                    <Select
                        label="Category"
                        data={categories.map((cat) => ({
                            label: cat.category_name,
                            value: cat.id.toString(),
                        }))}
                        {...form.getInputProps('category_id')}
                    />

                    <FormDivider />
                    <Group>
                        <Button loading={isUptading} type="submit">
                            Update
                        </Button>
                        <Button variant="light" onClick={props.requestClose}>
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default Update;
