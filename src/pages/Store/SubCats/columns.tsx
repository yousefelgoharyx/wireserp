import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SubCategoryTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
];
