import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SubCategoryTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
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
