import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import { safesToSelectItems } from '../../../api/finance/useSafes';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import FormDivider from '../../../components/FormDivider';
import FormGrid from '../../../components/FormGrid';
import FormShell from '../../../components/FormShell';
import useCreate from '../../../hooks/useCreate';
import useRead from '../../../hooks/useRead';
import useRemove from '../../../hooks/useRemove';
import getApiError from '../../../utils/getApiError';
import toSelectItems from '../../../utils/toSelectItems';
import { transferColumns } from './columns';
import { transferSchema } from './schema';

const SafesTransfer = () => {
  const [opened, handle] = useDisclosure(false);
  const selectedId = useRef<number>(null);
  const transferOwner = useCreate<SafeTransferFormValues>(
    ['transfer-safes'],
    '/transfer-safes'
  );
  const transfers = useRead<SafeTransfer[]>(
    ['transfer-safes'],
    '/transfer-safes'
  );
  const safes = useRead<Safe[]>(['safes'], '/safes');
  const removeOwner = useRemove(['transfer-safes'], '/transfer-safes');

  const form = useForm<SafeTransferFormValues>({
    validate: yupResolver(transferSchema),
    initialValues: {
      from_safe_id: null,
      to_safe_id: null,
      amount: undefined,
      notes: '',
    },
  });

  async function handleSubmit(values: SafeTransferFormValues) {
    try {
      await transferOwner.create(values);
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

  async function handleRemove() {
    try {
      await removeOwner.remove(selectedId.current);
      showNotification({
        message: 'Transfer deleted',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
    handle.close();
  }

  const cols: ColumnDef<SafeTransfer>[] = [
    ...transferColumns,
    {
      id: 'select',
      header: 'Actions',
      cell: ({ row }) => (
        <EditDelete
          onDelete={() => {
            handle.open();
            selectedId.current = row.original.id;
          }}
        />
      ),
    },
  ];

  const to = safes.data.filter((safe) => safe.id !== form.values.from_safe_id);
  const from = safes.data.filter((safe) => safe.id !== form.values.to_safe_id);
  const selectItemsTo = toSelectItems<Safe>(to, {
    valueKey: 'id',
    labelKey: 'safe_name',
  });
  const selectItemsFrom = toSelectItems<Safe>(from, {
    valueKey: 'id',
    labelKey: 'safe_name',
  });
  return (
    <Stack>
      <FormShell title="Transfer between safes">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <FormGrid>
              <Select
                data={selectItemsFrom}
                label="From Safe"
                placeholder="Select Safe"
                {...form.getInputProps('from_safe_id')}
                onChange={(v) => form.setFieldValue('from_safe_id', +v)}
                value={form.values.from_safe_id?.toString() ?? null}
              />
              <Select
                data={selectItemsTo}
                label="To Safe"
                placeholder="Select Safe"
                {...form.getInputProps('to_safe_id')}
                onChange={(v) => form.setFieldValue('to_safe_id', +v)}
                value={form.values.to_safe_id?.toString() ?? null}
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
              <Button loading={transferOwner.isCreating} type="submit">
                Transfer
              </Button>
            </Group>
          </Stack>
        </form>
      </FormShell>
      <DeleteModal
        isOpen={opened}
        loading={removeOwner.isRemoving}
        onConfirm={handleRemove}
        requestClose={handle.close}
        text="Are you sure you want to delete this transfer?"
        title="Delete Transfer"
      />
      <DataGrid columns={cols} data={transfers.data} />
    </Stack>
  );
};

export default SafesTransfer;
