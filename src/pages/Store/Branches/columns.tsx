import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<BranchTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'branch_name',
        header: 'Name',
    },
    {
        accessorKey: 'branch_phone',
        header: 'Phone',
    },
    {
        accessorKey: 'branch_address',
        header: 'Address',
    },
    {
        accessorKey: 'commercial_registration_number',
        header: 'Registeration Number',
    },
];
