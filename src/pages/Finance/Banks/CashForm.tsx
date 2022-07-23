import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import MoneyInput from '../../../components/MoneyInput';
import useCreate from '../../../hooks/useCreate';
import useRead from '../../../hooks/useRead';
import toSelectItems from '../../../utils/toSelectItems';
import { CashAddSchema } from './model/schema';

const CashForm = () => {
    const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
    const { create, isCreating } = useCreate<CashForm>(
        ['bank-activity'],
        '/bank-activity'
    );
    const form = useForm<CashForm>({
        schema: yupResolver(CashAddSchema),
        initialValues: {
            bank_id: null,
            amount: undefined,
            notes: '',
            type: null,
        },
    });

    const selectBanks = toSelectItems<Bank>(banks, {
        labelKey: 'bank_name',
        valueKey: 'id',
    });

    async function handleSubmit() {
        try {
            await create(form.values);
            showNotification({
                message: `Successful ${form.values.type} operation`,
            });
        } catch (error) {
            showNotification({
                message: `Error ${form.values.type} operation`,
                color: 'red',
            });
        }
        form.reset();
    }

    return (
        <FormShell title="Cash withdraw and deposit">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <FormGrid>
                        <Select
                            label="Process type"
                            placeholder="Select type"
                            data={[
                                { label: 'Withdraw', value: 'withdraw' },
                                { label: 'Deposit', value: 'deposit' },
                            ]}
                            {...form.getInputProps('type')}
                        />
                        <Select
                            label="Bank name"
                            placeholder="Select a bank"
                            data={selectBanks}
                            {...form.getInputProps('bank_id')}
                            onChange={(v) => form.setFieldValue('bank_id', +v)}
                            value={form.values.bank_id?.toString() ?? null}
                        />
                        <MoneyInput
                            label="Amount"
                            placeholder="Enter amount"
                            hideControls
                            {...form.getInputProps('amount')}
                        />
                        <TextInput
                            label="Process reason"
                            placeholder="Enter reason"
                            {...form.getInputProps('notes')}
                        />
                    </FormGrid>
                    <FormDivider />
                    <Button loading={isCreating} type="submit">
                        Record process
                    </Button>
                </Stack>
            </form>
        </FormShell>
    );
};

export default CashForm;
