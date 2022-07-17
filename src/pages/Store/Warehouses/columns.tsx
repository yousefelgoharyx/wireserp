import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<WarehouseTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'warehouse_name',
        header: 'Warehouse',
    },
    {
        accessorKey: 'branch',
        header: 'Branch',
    },
];
