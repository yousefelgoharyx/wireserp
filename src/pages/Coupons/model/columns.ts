import { ColumnDef } from '@tanstack/react-table';

export const couponsCols: ColumnDef<Bank>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'bank_name',
        header: 'Bank name',
    },
];
