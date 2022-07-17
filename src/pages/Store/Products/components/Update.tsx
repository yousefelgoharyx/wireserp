import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../../components/FormDivider';
import find from '../../../../utils/find';
import { useProducts } from '../Provider';
import branchSchema from '../schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const Update = (props: Props) => {
    const { update, isUptading, data } = useProducts();

    const form = useForm<Product>({
        schema: yupResolver(branchSchema),
        initialValues: find(props.selectedId, data),
    });

    async function handleUpdate(product: Product) {
        await update(product);
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
                    {/* <TextInput
                        required
                        label="Name"
                        {...form.getInputProps('branch_name')}
                    />
                    <TextInput
                        required
                        label="Phone"
                        {...form.getInputProps('branch_phone')}
                    />
                    <TextInput
                        required
                        label="Address"
                        {...form.getInputProps('branch_address')}
                    />
                    <TextInput
                        label="Registration Number"
                        {...form.getInputProps(
                            'commercial_registration_number'
                        )}
                    /> */}
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
