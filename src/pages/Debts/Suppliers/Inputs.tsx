import { NumberInput, Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import useContries from '../../../hooks/useContries';
type Props = {
  form: UseFormReturnType<SupplierFormValues>;
};
const Inputs = ({ form }: Props) => {
  const { countriesSelect } = useContries();
  return (
    <>
      <TextInput
        label="Client name"
        placeholder="Name"
        {...form.getInputProps('s_name')}
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
        {...form.getInputProps('s_phone')}
      />
      <TextInput
        label="Client notes"
        placeholder="Notes"
        {...form.getInputProps('s_notes')}
      />

      <TextInput
        label="Client address"
        placeholder="Address"
        {...form.getInputProps('s_address')}
      />

      <TextInput
        label="Client Email"
        placeholder="Email"
        {...form.getInputProps('s_email')}
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
        {...form.getInputProps('s_company')}
      />
      <NumberInput
        placeholder="Enter..."
        label="Tax number"
        hideControls
        {...form.getInputProps('s_tax_number')}
      />
      <Select
        searchable
        data={countriesSelect}
        label="Nationality"
        placeholder="Select nationality"
        {...form.getInputProps('s_nationality')}
      />
    </>
  );
};

export default Inputs;
