import { Button, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../../../components/FormDivider';
import FormShell from '../../../../components/FormShell';
import branchSchema from '../schema';
import { useBranches } from '../Provider';
import FormGrid from '../../../../components/FormGrid';
const CreateBranch = () => {
    const { create, isCreating } = useBranches();
    const form = useForm<BranchFormValues>({
        schema: yupResolver(branchSchema),
        initialValues: {
            branch_name: '',
            branch_phone: '',
            branch_address: '',
            commercial_registration_number: '',
        },
    });

    return (
        <FormShell title="Add Branch">
            <form onSubmit={form.onSubmit(create)}>
                <Stack>
                    <FormGrid>
                        <TextInput
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
                        />
                    </FormGrid>

                    <FormDivider />
                    <Button loading={isCreating} type="submit">
                        Add
                    </Button>
                </Stack>
            </form>
        </FormShell>
    );
};

export default CreateBranch;
