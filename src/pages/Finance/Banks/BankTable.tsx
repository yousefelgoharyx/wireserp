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
import BankUpdate from './BankUpdate';
import { bankCols } from './model/columns';

const BankTable = () => {
    const [deleteModal, deleteHandle] = useDisclosure(false);
    const [updateModal, updateHandle] = useDisclosure(false);
    const selectedId = useRef<number>();
    const { data: banks } = useRead<Bank[]>(['banks'], '/banks');
    const { remove, isRemoving } = useRemove(['banks'], '/banks');

    const handleDelete = async () => {
        try {
            await remove(selectedId.current);
            showNotification({
                message: 'Bank deleted successfully',
            });
        } catch (error) {
            showNotification({
                message: error.message,
                color: 'red',
            });
        }
        deleteHandle.close();
    };

    const cols: ColumnDef<Bank>[] = [
        ...bankCols,
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
                title="Delete a bank"
                text="Are you sure you want to delete this bank"
                loading={isRemoving}
                onConfirm={handleDelete}
                isOpen={deleteModal}
                requestClose={deleteHandle.close}
            />
            {selectedId.current && (
                <BankUpdate
                    isOpen={updateModal}
                    requestClose={updateHandle.close}
                    selectedId={selectedId.current}
                />
            )}

            <DataGrid data={banks} columns={cols} />
        </Stack>
    );
};

export default BankTable;
