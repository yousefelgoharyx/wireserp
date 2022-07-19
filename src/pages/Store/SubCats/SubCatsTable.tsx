import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import CatsUpdate from './SubCatsUpdate';
import { columns } from './columns';
import useSubCats from '../../../api/useSubCats';

const SubCatsTable = () => {
    const { data: subcats, remove, isRemoving } = useSubCats();
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);
    const tableData: SubCategoryTable[] = subcats.map((subcat) => {
        return {
            id: subcat.id,
            category: subcat.category?.category_name || '-',
            name: subcat.sub_category_name,
        };
    });

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
                color: 'red',
            });
        }
        deleteHandlers.close();
    }

    const cols: ColumnDef<SubCategoryTable>[] = [
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
                title="Delete sub category"
                text="Are you sure you want to delete this sub category?"
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
            <DataGrid data={tableData} columns={cols} />
        </>
    );
};

export default SubCatsTable;
