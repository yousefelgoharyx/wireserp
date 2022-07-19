import { Text } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'c_name',
        header: 'Name',
    },
    {
        accessorKey: 'releated_user',
        header: 'User',
    },
    {
        id: 'Indebtedness',
        header: 'Indebtedness',
        cell: (table) => (
            <Text>
                {table.row.original.indebt_type}{' '}
                {table.row.original.indebt_amount}
            </Text>
        ),
    },
    {
        accessorKey: 'deal_type',
        header: 'Deal type',
    },
    {
        accessorKey: 'c_phone',
        header: 'Phone',
    },
    {
        accessorKey: 'c_address',
        header: 'Address',
    },
    {
        accessorKey: 'c_tax_number',
        header: 'Tax Number',
    },
    {
        accessorKey: 'c_company',
        header: 'Company',
    },
];
