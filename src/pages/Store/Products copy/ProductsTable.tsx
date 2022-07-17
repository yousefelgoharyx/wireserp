import { useDisclosure } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import CatsUpdate from './ProductsUpdate';
import { columns } from './columns';

const SubCatsTable = () => {
    const [deleteOpened, deleteHandlers] = useDisclosure(false);
    const [editOpened, editHandler] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);

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
                title="Delete warehouse"
                text="Are you sure you want to delete this warehouse?"
                loading={false}
                onConfirm={() => {}}
            />
            {editOpened && (
                <CatsUpdate
                    isOpen={editOpened}
                    requestClose={editHandler.close}
                    selectedId={selectedId.current}
                />
            )}
            <DataGrid data={[]} columns={cols} />
        </>
    );
};

export default SubCatsTable;
