import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import MoneyInput from '../../../components/MoneyInput';
import useCreate from '../../../hooks/useCreate';
import useRead from '../../../hooks/useRead';
import useRemove from '../../../hooks/useRemove';
import toSelectItems from '../../../utils/toSelectItems';
import { bankSafeTransferCols, safeBankTransfer } from './model/columns';
import { BankSafeTransferSchema } from './model/schema';

const Table = () => {
    const selectedId = useRef<number>();
    const [deleteModal, deleteHandle] = useDisclosure(false);
    const { data } = useRead<BankTransfer[]>(['safe-to-bank'], '/safe-to-bank');
    const { remove, isRemoving } = useRemove(
        ['banks', 'safes', 'safe-to-bank'],
        '/safe-to-bank'
    );
    const cols: ColumnDef<BankSafeTransfer>[] = [
        ...safeBankTransfer,
        {
            id: 'select',
            header: 'Actions',
            cell: ({ row }) => (
                <EditDelete
                    onDelete={() => {
                        selectedId.current = row.original.id;
                        deleteHandle.open();
                    }}
                />
            ),
        },
    ];

    async function handleDelete() {
        try {
            await remove(selectedId.current);
            showNotification({
                message: 'Deleted a transfer',
            });
        } catch (error) {
            showNotification({
                message: 'Failed to delete a transfer',
                color: 'red',
            });
        }
        deleteHandle.close();
    }
    return (
        <>
            <DeleteModal
                title="Delete a transfer"
                text="Are you sure you want to delete this transfer"
                loading={isRemoving}
                onConfirm={handleDelete}
                isOpen={deleteModal}
                requestClose={deleteHandle.close}
            />
            <DataGrid data={data} columns={cols} />
        </>
    );
};
const TransferSafeBank = () => {
    const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
    const { data: safes } = useRead<Safe[]>(['safes'], '/safes');
    const { create, isCreating } = useCreate<BankSafeTransferForm>(
        ['banks', 'safes', 'safe-to-bank'],
        '/safe-to-bank'
    );

    const form = useForm<BankSafeTransferForm>({
        schema: yupResolver(BankSafeTransferSchema),
        initialValues: {
            bank_id: null,
            safe_id: null,
            amount: undefined,
            notes: '',
        },
    });

    async function handleSubmit() {
        try {
            await create(form.values);
            showNotification({
                message: 'Transfer succeded',
            });
        } catch (error) {
            showNotification({
                message: 'Transfer failed',
                color: 'red',
            });
        }
    }

    const banksSelect = toSelectItems<Bank>(banks, {
        labelKey: 'bank_name',
        valueKey: 'id',
    });
    const safesSelect = toSelectItems<Safe>(safes, {
        labelKey: 'safe_name',
        valueKey: 'id',
    });

    return (
        <Stack>
            <FormShell title="Bank Transfer">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <FormGrid>
                            <Select
                                label="From safe"
                                placeholder="Select safe"
                                data={safesSelect}
                                {...form.getInputProps('safe_id')}
                                onChange={(v) =>
                                    form.setFieldValue('safe_id', +v)
                                }
                                value={form.values.safe_id?.toString() ?? null}
                            />
                            <Select
                                label="to bank"
                                placeholder="Select bank"
                                data={banksSelect}
                                {...form.getInputProps('bank_id')}
                                onChange={(v) =>
                                    form.setFieldValue('bank_id', +v)
                                }
                                value={form.values.bank_id?.toString() ?? null}
                            />

                            <MoneyInput
                                label="Amount"
                                placeholder="Enter amount"
                                hideControls
                                {...form.getInputProps('amount')}
                            />
                            <TextInput
                                label="Notes"
                                placeholder="Enter Notes"
                                {...form.getInputProps('notes')}
                            />
                        </FormGrid>
                        <FormDivider />
                        <Button loading={isCreating} type="submit">
                            Transfer
                        </Button>
                    </Stack>
                </form>
            </FormShell>
            <Table />
        </Stack>
    );
};

export default TransferSafeBank;
