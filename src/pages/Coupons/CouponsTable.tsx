import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../components/DataGrid';
import DeleteModal from '../../components/DeleteModal';
import EditDelete from '../../components/EditDelete';
import useRead from '../../hooks/useRead';
import useRemove from '../../hooks/useRemove';
import getApiError from '../../utils/getApiError';
import CouponsUpdate from './CouponsUpdate';
import { couponsCols } from './model/columns';

const CouponsTable = () => {
  const [deleteModal, deleteHandle] = useDisclosure(false);
  const [updateModal, updateHandle] = useDisclosure(false);
  const selectedId = useRef<number>();
  const { data: coupons } = useRead<Coupon[]>(['coupons'], '/coupons');
  const { remove, isRemoving } = useRemove(['coupons'], '/coupons');

  async function handleRemove() {
    try {
      await remove(selectedId.current);
      showNotification({
        message: 'Coupon deleted successfully',
      });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
      });
    }
  }
  const cols: ColumnDef<Coupon>[] = [
    ...couponsCols,
    {
      id: 'select',
      header: 'Actions',
      cell: ({ row }) => (
        <EditDelete
          onDelete={() => {
            selectedId.current = row.original.id;
            deleteHandle.open();
          }}
          onEdit={() => {
            selectedId.current = row.original.id;
            updateHandle.open();
          }}
        />
      ),
    },
  ];

  return (
    <Stack>
      <DeleteModal
        title="Delete a coupon"
        text="Do you want to delete a coupon"
        isOpen={deleteModal}
        requestClose={deleteHandle.close}
        loading={isRemoving}
        onConfirm={handleRemove}
      />
      {updateModal && (
        <CouponsUpdate
          requestClose={updateHandle.close}
          isOpen={updateModal}
          selectedId={selectedId.current}
        />
      )}
      <DataGrid data={coupons} columns={cols} />
    </Stack>
  );
};

export default CouponsTable;
