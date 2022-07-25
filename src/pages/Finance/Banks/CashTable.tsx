import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import useRead from '../../../hooks/useRead';
import useRemove from '../../../hooks/useRemove';
import { cashCols } from './model/columns';

const CashTable = () => {
  const [deleteModal, deleteHandle] = useDisclosure(false);
  const selectedId = useRef<number>();
  const { data: cashes } = useRead<Cash[]>(['bank-activity'], '/bank-activity');

  const { remove, isRemoving } = useRemove(['bank-activity'], '/bank-activity');

  const handleDelete = async () => {
    try {
      await remove(selectedId.current);
      showNotification({
        message: 'Process reversed successfully',
      });
    } catch (error) {
      showNotification({
        message: error.message,
        color: 'red',
      });
    }
    deleteHandle.close();
  };

  const cols: ColumnDef<Cash>[] = [
    ...cashCols,
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
  return (
    <Stack>
      <DeleteModal
        title="Delete a bank"
        text="Are you sure you want to delete this bank"
        loading={isRemoving}
        onConfirm={handleDelete}
        isOpen={deleteModal}
        requestClose={deleteHandle.close}
      />

      <DataGrid data={cashes} columns={cols} />
    </Stack>
  );
};

export default CashTable;
