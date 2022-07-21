import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Safe>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'safe_name',
        header: 'Safe name',
    },
    {
        accessorKey: 'branch',
        header: 'Branch',
    },

    {
        accessorKey: 'safe_balance',
        header: 'Safe Balance',
    },
    {
        accessorKey: 'safe_type',
        header: 'Type',
    },
];
