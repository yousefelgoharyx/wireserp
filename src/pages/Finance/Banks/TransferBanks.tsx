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
import { bankTransferCols } from './model/columns';
import { BankTransferSchema } from './model/schema';

const Table = () => {
    const selectedId = useRef<number>();
    const [deleteModal, deleteHandle] = useDisclosure(false);
    const { data } = useRead<BankTransfer[]>(
        ['transfer-banks'],
        '/transfer-banks'
    );
    const { remove, isRemoving } = useRemove(
        ['banks', 'transfer-banks'],
        '/transfer-banks'
    );
    const cols: ColumnDef<BankTransfer>[] = [
        ...bankTransferCols,
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
const TransferBanks = () => {
    const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
    const { create, isCreating } = useCreate<BankTransferForm>(
        ['banks', 'transfer-banks'],
        '/transfer-banks'
    );

    const form = useForm<BankTransferForm>({
        schema: yupResolver(BankTransferSchema),
        initialValues: {
            from_bank: null,
            to_bank: null,
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

    const fromBanks = banks.filter((bank) => bank.id !== form.values.to_bank);
    const toBanks = banks.filter((bank) => bank.id !== form.values.from_bank);
    const fromBanksSelect = toSelectItems<Bank>(fromBanks, {
        labelKey: 'bank_name',
        valueKey: 'id',
    });
    const toBanksSelect = toSelectItems<Bank>(toBanks, {
        labelKey: 'bank_name',
        valueKey: 'id',
    });

    return (
        <Stack>
            <FormShell title="Bank Transfer">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <FormGrid>
                            <Select
                                label="From bank"
                                placeholder="Select bank"
                                data={fromBanksSelect}
                                {...form.getInputProps('from_bank')}
                                onChange={(v) =>
                                    form.setFieldValue('from_bank', +v)
                                }
                                value={
                                    form.values.from_bank?.toString() ?? null
                                }
                            />
                            <Select
                                label="To bank"
                                placeholder="Select bank"
                                data={toBanksSelect}
                                {...form.getInputProps('to_bank')}
                                onChange={(v) =>
                                    form.setFieldValue('to_bank', +v)
                                }
                                value={form.values.to_bank?.toString() ?? null}
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

export default TransferBanks;
