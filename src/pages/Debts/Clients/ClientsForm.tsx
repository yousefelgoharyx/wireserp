import {
    Button,
    Grid,
    Group,
    InputWrapper,
    NumberInput,
    SegmentedControl,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useClients from '../../../api/debts/useClients';
import useUsers from '../../../api/useUsers';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import useContries from '../../../hooks/useContries';
import schema from './schema';

const ClientsForm = () => {
    const form = useForm<ClientFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            c_name: '',
            releated_user: null,
            indebt_amount: null,
            indebt_type: 'for',
            c_phone: null,
            c_notes: null,
            c_address: null,
            deal_type: null,
            c_email: null,
            c_company: null,
            c_nationality: null,
            c_tax_number: null,
        },
    });
    const { selectData } = useUsers();
    const { countriesSelect } = useContries();
    const { create, isCreating } = useClients();
    async function handleSubmit(values: ClientFormValues) {
        try {
            await create(values);
            showNotification({
                message: 'Client Created Successfully',
            });
            form.reset();
        } catch (error) {
            showNotification({
                message: 'Error Creating Client',
                color: 'red',
            });
        }
    }
    return (
        <FormShell title="Add Client">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
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

export default ClientsForm;
