import {
    Button,
    Group,
    Modal,
    NumberInput,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useClients from '../../../api/debts/useClients';
import useUsers from '../../../api/useUsers';
import FormDivider from '../../../components/FormDivider';
import useContries from '../../../hooks/useContries';
import find from '../../../utils/find';
import schema from './schema';
type Props = {
    isOpen: boolean;
    requestClose: () => void;
    selectedId: number;
};
const ClientUpdate = (props: Props) => {
    const { selectData } = useUsers();
    const { countriesSelect } = useContries();
    const { data: clients, update, isUpdating } = useClients();
    const form = useForm<Client>({
        schema: yupResolver(schema),
        initialValues: find(props.selectedId, clients),
    });

    async function handleUpdate(values: Client) {
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
                    <TextInput
                        label="Client name"
                        placeholder="Name"
                        {...form.getInputProps('c_name')}
                    />
                    <Select
                        label="Related user"
                        placeholder="Select user"
                        data={[
                            { label: 'All users', value: 'all' },
                            ...selectData,
                        ]}
                        {...form.getInputProps('releated_user')}
                    />

                    <NumberInput
                        placeholder="Amout"
                        label="indebtedness"
                        hideControls
                        rightSectionWidth={92}
                        rightSection={
                            <Select
                                data={[
                                    { label: 'For', value: 'for' },
                                    { label: 'On', value: 'on' },
                                ]}
                                {...form.getInputProps('indebt_type')}
                            />
                        }
                        {...form.getInputProps('indebt_amount')}
                    />
                    <TextInput
                        label="Phone with country code"
                        placeholder="Phone"
                        {...form.getInputProps('c_phone')}
                    />
                    <TextInput
                        label="Client notes"
                        placeholder="Notes"
                        {...form.getInputProps('c_notes')}
                    />

                    <TextInput
                        label="Client address"
                        placeholder="Address"
                        {...form.getInputProps('c_address')}
                    />

                    <TextInput
                        label="Client Email"
                        placeholder="Email"
                        {...form.getInputProps('c_email')}
                    />

                    <Select
                        placeholder="Select dealing type"
                        label="Dealing type"
                        data={[
                            { label: 'Piece', value: 'piece' },
                            { label: 'Wholesale', value: 'wholesale' },
                        ]}
                        {...form.getInputProps('deal_type')}
                    />

                    <TextInput
                        label="Company name"
                        placeholder="Company name"
                        {...form.getInputProps('c_company')}
                    />
                    <NumberInput
                        placeholder="Enter..."
                        label="Tax number"
                        hideControls
                        {...form.getInputProps('c_tax_number')}
                    />
                    <Select
                        searchable
                        data={countriesSelect}
                        label="Nationality"
                        placeholder="Select nationality"
                        {...form.getInputProps('c_nationality')}
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

export default ClientUpdate;
