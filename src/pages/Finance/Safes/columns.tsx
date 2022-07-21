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

export const transferColumns: ColumnDef<SafeTransfer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'from_safe',
        header: 'From Safe',
    },
    {
        accessorKey: 'to_safe',
        header: 'To Safe',
    },

    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
    },
];
