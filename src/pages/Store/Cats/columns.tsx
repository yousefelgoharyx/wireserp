import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<CategoryTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'category_name',
        header: 'Name',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
];
