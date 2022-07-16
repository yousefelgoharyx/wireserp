import { Button, Group, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../components/FormDivider';
import FormShell from '../../components/FormShell';
import { BranchFormValues } from 'branches';
import branchSchema from './schemas/schema';
import { useBranches } from './BranchesProvider';
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
                    <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    >
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
                    </SimpleGrid>

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
