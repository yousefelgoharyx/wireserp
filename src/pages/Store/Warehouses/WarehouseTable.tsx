import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useRef } from 'react';
import useGetBranches from '../../../api/useBranches';
import useWarehouses from '../../../api/useWarehouses';
import DataGrid from '../../../components/DataGrid';
import DeleteModal from '../../../components/DeleteModal';
import EditDelete from '../../../components/EditDelete';
import find from '../../../utils/find';
import { columns } from './columns';

const WarehouseTable = () => {
    const { data: warehouses, remove, isRemoving } = useWarehouses();
    const { data: branches } = useGetBranches();
    const [opened, handlers] = useDisclosure(false);
    const selectedId = useRef<number | null>(null);

    const tableData: WarehouseTable[] = warehouses.map((warehouse) => {
        return {
            id: warehouse.id,
            branch: find(warehouse.branch_id, branches).branch_name,
            warehouse_name: warehouse.warehouse_name,
        };
    });

    async function handleDelete() {
        try {
            await remove(selectedId.current);
            showNotification({
                title: 'Success',
                message: 'Warehouse deleted successfully',
            });
        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Error deleting warehouse',
            });
        }
        handlers.close();
    }

    const cols: ColumnDef<WarehouseTable>[] = [
        ...columns,
        {
            id: 'select',
            header: 'Actions',
            cell: ({ row }) => (
                <EditDelete
                    onDelete={() => {
                        handlers.open();
                        selectedId.current = row.original.id;
                    }}
                    onEdit={() => {}}
                />
            ),
        },
    ];
    return (
        <>
            <DeleteModal
                isOpen={opened}
                requestClose={handlers.close}
                title="Delete warehouse"
                text="Are you sure you want to delete this warehouse?"
                loading={isRemoving}
                onConfirm={handleDelete}
            />
            <DataGrid data={tableData} columns={cols} />
        </>
    );
};

export default WarehouseTable;
