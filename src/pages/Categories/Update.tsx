import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Category } from 'categories';
import FormDivider from '../../components/FormDivider';
import { useCategories } from './CategoriesContext';
import branchSchema from './schemas/schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const Update = (props: Props) => {
    const { get, update, isUptading } = useCategories();

    const form = useForm<Category>({
        schema: yupResolver(branchSchema),
        initialValues: get(props.selectedId),
    });

    async function handleUpdate(category: Category) {
        await update(category);
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
                        required
                        label="Name"
                        {...form.getInputProps('category_name')}
                    />
                    <TextInput
                        required
                        label="Phone"
                        {...form.getInputProps('type')}
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
