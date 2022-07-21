import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import { columns } from './columns';
import useSafes from '../../../api/finance/useSafes';
import SafeUpdate from './SafeUpdate';

const SafeTable = () => {
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);
    const { data: clients, remove, isRemoving } = useSafes();

    const cols: ColumnDef<Safe>[] = [
        ...columns,
        {
            id: 'select',
            header: 'Actions',
            cell: ({ row }) => (
                <EditDelete
                    onDelete={() => {
                        deleteHandlers.open();
                        selectedId.current = row.original.id;
                    }}
                    onEdit={() => {
                        editHandler.open();
                        selectedId.current = row.original.id;
                    }}
                />
            ),
        },
    ];

    async function handleDelete() {
        try {
            await remove(selectedId.current);
            showNotification({
                message: 'Safe Deleted Successfully',
            });
        } catch {
            showNotification({
                message: 'Error deleting a safe',
                color: 'red',
            });
        }
        deleteHandlers.close();
    }
    return (
        <>
            <DeleteModal
                isOpen={deleteOpened}
                requestClose={deleteHandlers.close}
                title="Delete a safe"
                text="Are you sure you want to delete this safe?"
                loading={isRemoving}
                onConfirm={handleDelete}
            />
            {editOpened && (
                <SafeUpdate
                    isOpen={editOpened}
                    requestClose={editHandler.close}
                    selectedId={selectedId.current}
                />
            )}
            <Stack>
                <DataGrid data={clients} columns={cols} />
            </Stack>
        </>
    );
};

export default SafeTable;
