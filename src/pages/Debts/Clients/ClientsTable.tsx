import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import useClients, { useClientsList } from '../../../api/debts/useClients';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import CatsUpdate from './ClientsUpdate';
import { columns } from './columns';

const ClientsTable = () => {
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);
    const { data: clients, remove, isRemoving } = useClients();
    const cols: ColumnDef<Client>[] = [
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
                message: 'Client Deleted Successfully',
            });
        } catch {
            showNotification({
                message: 'Error deleting a client',
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
                title="Delete client"
                text="Are you sure you want to delete this client?"
                loading={isRemoving}
                onConfirm={handleDelete}
            />
            {editOpened && (
                <CatsUpdate
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

export default ClientsTable;
