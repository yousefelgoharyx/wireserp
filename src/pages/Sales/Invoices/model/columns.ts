import { ColumnDef } from '@tanstack/react-table';

export const salesCols: ColumnDef<SaleBillTable>[] = [
  {
    accessorKey: 'product_name',
    header: 'Product Name',
  },
  {
    accessorKey: 'product_price',
    header: 'Product price',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'total_price',
    header: 'Total price',
  },
];
