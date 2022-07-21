import { Text } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Supplier>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 's_name',
        header: 'Name',
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
        accessorKey: 's_phone',
        header: 'Phone',
    },
    {
        accessorKey: 's_address',
        header: 'Address',
    },
    {
        accessorKey: 's_tax_number',
        header: 'Tax Number',
    },
    {
        accessorKey: 's_company',
        header: 'Company',
    },
    {
        accessorKey: 's_notes',
        header: 'Notes',
    },
];
