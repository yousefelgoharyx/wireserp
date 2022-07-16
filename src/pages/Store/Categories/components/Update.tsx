import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../../components/FormDivider';
import find from '../../../../utils/find';
import { useCategories } from '../Provider';
import branchSchema from '../schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const Update = (props: Props) => {
    const { update, isUptading, data } = useCategories();

    const form = useForm<Category>({
        schema: yupResolver(branchSchema),
        initialValues: find(props.selectedId, data),
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
                        label="Name"
                        {...form.getInputProps('category_name')}
                    />
                    <TextInput label="Type" {...form.getInputProps('type')} />

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
