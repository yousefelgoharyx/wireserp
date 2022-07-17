import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import useCategories from '../../../api/useCategories';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const CatsUpdate = (props: Props) => {
    const { update, isUpdating, data } = useCategories();

    const form = useForm<Category>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, data),
    });

    async function handleUpdate(category: Category) {
        const catUpdate: CategoryUpdate = {
            cat_id: category.id,
            category_name: category.category_name,
            type: category.type,
        };
        await update(catUpdate);
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
                        label="Name"
                        placeholder="Category name"
                        {...form.getInputProps('category_name')}
                    />
                    <TextInput
                        label="Type"
                        placeholder="Category type"
                        {...form.getInputProps('type')}
                    />
                    <FormDivider />
                    <Group>
                        <Button loading={isUpdating} type="submit">
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

export default CatsUpdate;
