import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../components/FormDivider';
import FormShell from '../../components/FormShell';
import { BranchForm } from 'branches';
import branchSchema from './schemas/schema';
import { useBranches } from './BranchesProvider';
const CreateBranch = () => {
    const { createBranch, isCreating } = useBranches();
    const form = useForm<BranchForm>({
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
            <form onSubmit={form.onSubmit(createBranch)}>
                <Stack>
                    <Group grow>
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
                    </Group>
                    <Group grow>
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
                    </Group>
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

export default CreateBranch;
