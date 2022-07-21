import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSafes from '../../../api/finance/useSafes';
import { useBranchesList } from '../../../api/store/useBranches';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import schema from './schema';

const SafeForm = () => {
    const form = useForm<SafeFormValues>({
        schema: yupResolver(schema),
        initialValues: {
            safe_name: '',
            branch_id: null,
            safe_balance: null,
            safe_type: '',
        },
    });

    const { create, isCreating } = useSafes();
    const { branchesSelect } = useBranchesList();
    async function handleSubmit(values: SafeFormValues) {
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
                            label="Safe name"
                            placeholder="Name"
                            {...form.getInputProps('safe_name')}
                        />
                        <Select
                            label="Branch"
                            placeholder="Select branch"
                            data={branchesSelect}
                            {...form.getInputProps('branch_id')}
                            onChange={(v) =>
                                form.setFieldValue('branch_id', Number(v))
                            }
                        />

                        <NumberInput
                            placeholder="Amount"
                            label="Safe balance"
                            hideControls
                            {...form.getInputProps('safe_balance')}
                        />
                        <TextInput
                            label="Safe type"
                            placeholder="type"
                            {...form.getInputProps('safe_type')}
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

export default SafeForm;
