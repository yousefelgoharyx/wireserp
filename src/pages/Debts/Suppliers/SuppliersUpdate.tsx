import { Button, Group, Modal, Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useClients from '../../../api/debts/useClients';
import useSuppliers from '../../../api/debts/useSuppliers';
import FormDivider from '../../../components/FormDivider';
import find from '../../../utils/find';
import Inputs from './Inputs';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const SuppliersUpdate = (props: Props) => {
    const { data: clients, update, isUpdating } = useSuppliers();
    const form = useForm<Supplier>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, clients),
    });

    async function handleUpdate(values: Supplier) {
        try {
            await update(values);
            showNotification({
                message: 'Client Updated Successfully',
            });
        } catch {
            showNotification({
                message: 'Error Updating Client',
            });
        }
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
                    <Inputs form={form} />
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

export default SuppliersUpdate;
