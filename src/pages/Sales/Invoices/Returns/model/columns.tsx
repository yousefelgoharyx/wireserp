import { Anchor } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export function getReturnCols() {
  const cols: ColumnDef<Return>[] = [
    {
      accessorKey: 'id',
      header: '#',
      size: 50,
    },
    {
      accessorKey: 'bill_id',
      header: 'Invoice id',
      cell: (table) => {
        return (
          <Anchor
            component={Link}
            to={`/invoices/view/${table.row.original.bill_id}`}
          >
            {table.row.original.bill_id}
          </Anchor>
        );
      },
    },
    {
      accessorKey: 'client_name',
      header: 'Client Name',
    },
    {
      accessorKey: 'product_name',
      header: 'Product Name',
    },

    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },

    {
      accessorKey: 'date_time',
      header: 'Date',
      size: 220,
      cell: (table) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(new Date(table.row.original?.date_time)),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
    },
  ];
  return cols;
}
