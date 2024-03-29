import { Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useBranchesList } from '../../../api/store/useBranches';
import MoneyInput from '../../../components/MoneyInput';
type Props = {
  form: UseFormReturnType<SafeFormValues>;
};
const Inputs = ({ form }: Props) => {
  const { branchesSelect } = useBranchesList();

  return (
    <>
      <TextInput
        label="Safe name"
        placeholder="Name"
        {...form.getInputProps('safe_name')}
      />
      <Select
        label="Branch"
        placeholder="Select branch"
        data={branchesSelect}
        defaultValue={form.values.branch_id?.toString()}
        {...form.getInputProps('branch_id')}
        onChange={(v) => form.setFieldValue('branch_id', +v)}
        value={form.values.branch_id?.toString() ?? null}
      />

      <MoneyInput
        placeholder="Amount"
        label="Safe balance"
        hideControls
        {...form.getInputProps('safe_balance')}
      />
      <Select
        data={[
          { label: 'Primary', value: 'Main' },
          { label: 'Secondary', value: 'Sub' },
        ]}
        label="Safe type"
        placeholder="type"
        {...form.getInputProps('safe_type')}
      />
    </>
  );
};

export default Inputs;
