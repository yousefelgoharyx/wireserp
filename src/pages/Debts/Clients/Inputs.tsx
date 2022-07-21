import { NumberInput, Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import useUsers from '../../../api/useUsers';
import useContries from '../../../hooks/useContries';
type Props = {
    form: UseFormReturnType<ClientFormValues>;
};
const Inputs = ({ form }: Props) => {
    const { selectData } = useUsers();
    const { countriesSelect } = useContries();
    return (
        <>
            <TextInput
                label="Client name"
                placeholder="Name"
                {...form.getInputProps('c_name')}
            />
            <Select
                label="Related user"
                placeholder="Select user"
                data={[{ label: 'All users', value: null }, ...selectData]}
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
        </>
    );
};

export default Inputs;
