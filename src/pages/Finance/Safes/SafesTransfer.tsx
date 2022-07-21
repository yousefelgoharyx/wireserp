import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSafes, { safesToSelectItems } from '../../../api/finance/useSafes';
import useSafesTransfer from '../../../api/finance/useSafesTransfer';
import DataGrid from '../../../components/DataGrid';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import getApiError from '../../../utils/getApiError';
import { transferColumns } from './columns';
import { transferSchema } from './schema';

const SafesTransfer = () => {
    const transferOwner = useSafesTransfer();
    const { data: safes } = useSafes();
    const form = useForm<SafeTransferFormValues>({
        schema: yupResolver(transferSchema),
        initialValues: {
            from_safe_id: null,
            to_safe_id: null,
            amount: undefined,
            notes: '',
        },
    });

    async function handleSubmit(values: SafeTransferFormValues) {
        try {
            await transferOwner.transfer(values);
            showNotification({
                message: 'Transfer success',
            });
        } catch (error) {
            showNotification({
                message: getApiError(error.response.data),
                color: 'red',
            });
        }
        form.reset();
    }

    let to = safes.filter((safe) => safe.id !== form.values.from_safe_id);
    let from = safes.filter((safe) => safe.id !== form.values.to_safe_id);

    return (
        <Stack>
            <FormShell title="Transfer between safes">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <FormGrid>
                            <Select
                                data={safesToSelectItems(from)}
                                label="From Safe"
                                placeholder="Select Safe"
                                {...form.getInputProps('from_safe_id')}
                                onChange={(v) =>
                                    form.setFieldValue('from_safe_id', +v)
                                }
                                value={
                                    form.values.from_safe_id?.toString() ?? null
                                }
                            />
                            <Select
                                data={safesToSelectItems(to)}
                                label="To Safe"
                                placeholder="Select Safe"
                                {...form.getInputProps('to_safe_id')}
                                onChange={(v) =>
                                    form.setFieldValue('to_safe_id', +v)
                                }
                                value={
                                    form.values.to_safe_id?.toString() ?? null
                                }
                            />

                            <NumberInput
                                label="Amount"
                                hideControls
                                placeholder="Enter amount"
                                {...form.getInputProps('amount')}
                            />

                            <Textarea
                                label="Notes"
                                placeholder="Type..."
                                autosize
                                maxRows={4}
                                {...form.getInputProps('notes')}
                            />
                        </FormGrid>
                        <FormDivider />
                        <Group>
                            <Button
                                loading={transferOwner.isTransfering}
                                type="submit"
                            >
                                Transfer
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </FormShell>
            <DataGrid columns={transferColumns} data={transferOwner.data} />
        </Stack>
    );
};

export default SafesTransfer;
