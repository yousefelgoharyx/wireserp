import { ActionIcon, Group } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash } from 'tabler-icons-react';

interface Props {
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}
export function getViewAllCols({ onView, onDelete, isDeleting }: Props) {
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
