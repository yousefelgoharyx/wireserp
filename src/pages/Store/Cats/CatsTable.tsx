import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import useCategories from '../../../api/store/useCategories';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import CatsUpdate from './CatsUpdate';
import { columns } from './columns';

const CatsTable = () => {
    const { data: categories, remove, isRemoving } = useCategories();
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);

    async function handleDelete() {
        try {
            await remove(selectedId.current);
            showNotification({
                title: 'Success',
                message: 'Category deleted successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Error deleting Category',
            });
        }
        deleteHandlers.close();
    }

    const cols: ColumnDef<CategoryTable>[] = [
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
    return (
        <>
            <DeleteModal
                isOpen={deleteOpened}
                requestClose={deleteHandlers.close}
                title="Delete category"
                text="Are you sure you want to delete this category?"
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
            <DataGrid data={categories} columns={cols} />
        </>
    );
};

export default CatsTable;
