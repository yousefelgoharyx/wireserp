import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowBack, Eye, Trash } from 'tabler-icons-react';

interface ViewAllProps {
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}
interface ProductProps {
  onReturn: (id: number) => void;
  isReturning: boolean;
}
export function getViewAllCols({ onView, onDelete, isDeleting }: ViewAllProps) {
  const cols: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'id',
      header: '#',
      size: 80,
    },
    {
      accessorKey: 'client_name',
      header: 'Client Name',
    },

    {
      accessorKey: 'warehouse_name',
      header: 'Warehouse',
    },
    {
      accessorKey: 'date_time',
      header: 'Date',
      cell: (table) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(new Date(table.row.original?.date_time)),
      size: 220,
    },
    {
      accessorKey: 'final_total',
      header: 'Full price',
    },
    {
      accessorKey: 'paid',
      header: 'Payment',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (table) => {
        return (
          <Group>
            <ActionIcon onClick={() => onView(table.row.original.id)}>
              <Eye size={20} />
            </ActionIcon>
            <ActionIcon
              loading={isDeleting}
              onClick={() => onDelete(table.row.original.id)}
            >
              <Trash size={20} />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];
  return cols;
}

export function getInvoiceProductsCols({
  onReturn,
  isReturning,
}: ProductProps) {
  const cols: ColumnDef<InvoiceProduct>[] = [
    {
      accessorKey: 'id',
      header: '#',
      size: 80,
    },
    {
      accessorKey: 'product_name',
      header: 'Product Name',
    },

    {
      accessorKey: 'product_price',
      header: 'Product Price',
    },

    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'quantity_price',
      header: 'Quantity Price',
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
    },
    {
      accessorKey: 'final_total',
      header: 'Full price',
    },

    {
      id: 'actions',
      header: 'Actions',
      cell: (table) => {
        return (
          <Group>
            <Tooltip label="Return product" transition="scale">
              <ActionIcon
                loading={isReturning}
                onClick={() => onReturn(table.row.original.product_id)}
              >
                <ArrowBack size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        );
      },
    },
  ];
  return cols;
}
