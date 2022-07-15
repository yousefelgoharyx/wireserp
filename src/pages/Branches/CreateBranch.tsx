import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import FormDivider from '../../components/FormDivider';
import FormShell from '../../components/FormShell';
import { Branch } from 'branches';
import { showNotification } from '@mantine/notifications';
import getApiError from '../../utils/getApiError';
import useCreateBranch from './api/useCreateBranch';
import createSchema from './schemas/createSchema';
const CreateBranch = () => {
    const branches = useCreateBranch();
    const form = useForm<Branch>({
        schema: yupResolver(createSchema),
        initialValues: {
            branch_name: '',
            branch_phone: '',
            branch_address: '',
            commercial_registration_number: '',
        },
    });

    const handleSubmit = async (values) => {
        try {
            await branches.mutateAsync(values);
            showNotification({
                title: 'Success',
                message: 'Added branch successfully',
            });
        } catch (error) {
            console.log(error.config.headers.Authorization);

            showNotification({
                title: 'Something went wrong!',
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
    };
    return (
        <FormShell title="Add Branch">
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        <Button loading={branches.isLoading} type="submit">
                            Add
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FormShell>
    );
};

export default CreateBranch;
