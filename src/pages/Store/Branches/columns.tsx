import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<BranchTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 70,
    },

    {
        accessorKey: 'branch_name',
        header: 'Name',
        size: 150,
    },
    {
        accessorKey: 'branch_phone',
        header: 'Phone',
        size: 150,
    },
    {
        accessorKey: 'branch_address',
        header: 'Address',
        size: 150,
    },
    {
        accessorKey: 'commercial_registration_number',
        header: 'Registeration Number',
        size: 200,
    },
];
