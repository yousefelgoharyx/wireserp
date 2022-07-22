import { ColumnDef } from '@tanstack/react-table';

export const bankCols: ColumnDef<Bank>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'bank_name',
        header: 'Bank name',
    },

    {
        accessorKey: 'bank_balance',
        header: 'Bank balance',
    },
];
