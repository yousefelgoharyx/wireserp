import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import BalanceOfInput from '../../../components/BalanceOfInput';
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
import find from '../../../utils/find';
import getApiError from '../../../utils/getApiError';
import moneyFormatter from '../../../utils/moneyFormatter';
import toSelectItems from '../../../utils/toSelectItems';
import { bankSafeTransferCols } from './model/columns';
import { BankSafeTransferSchema } from './model/schema';

const Table = () => {
  const selectedId = useRef<number>();
  const [deleteModal, deleteHandle] = useDisclosure(false);
  const { data } = useRead<BankTransfer[]>(['bank-to-safe'], '/bank-to-safe');
  const { remove, isRemoving } = useRemove(
    ['banks', 'safes', 'bank-to-safe'],
    '/bank-to-safe'
  );
  const cols: ColumnDef<BankSafeTransfer>[] = [
    ...bankSafeTransferCols,
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
const TransferBankSafe = () => {
  const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
  const { data: safes } = useRead<Safe[]>(['safes'], '/safes');
  const { create, isCreating } = useCreate<BankSafeTransferForm>(
    ['banks', 'safes', 'bank-to-safe'],
    '/bank-to-safe'
  );

  const form = useForm<BankSafeTransferForm>({
    validate: yupResolver(BankSafeTransferSchema),
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
        message: getApiError(error.response.data),
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

  const bankBalance = moneyFormatter(
    find(+form.values.bank_id, banks)?.bank_balance.toString()
  );
  const safeBalance = moneyFormatter(
    find(+form.values.safe_id, safes)?.safe_balance.toString()
  );

  return (
    <Stack>
      <FormShell title="Bank to Safe Transfer">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <FormGrid>
              <Select
                label="From bank"
                placeholder="Select bank"
                data={banksSelect}
                {...form.getInputProps('bank_id')}
                onChange={(v) => form.setFieldValue('bank_id', +v)}
                value={form.values.bank_id?.toString() ?? null}
                rightSectionWidth={120}
                rightSection={<BalanceOfInput balance={bankBalance} />}
              />
              <Select
                label="To safe"
                placeholder="Select safe"
                data={safesSelect}
                {...form.getInputProps('safe_id')}
                onChange={(v) => form.setFieldValue('safe_id', +v)}
                value={form.values.safe_id?.toString() ?? null}
                rightSectionWidth={120}
                rightSection={<BalanceOfInput balance={safeBalance} />}
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

export default TransferBankSafe;
