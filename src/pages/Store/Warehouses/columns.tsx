import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<WarehouseTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'warehouse_name',
        header: 'Warehouse',
    },
    {
        accessorKey: 'branch',
        header: 'Branch',
    },
];

export const transferListCols: ColumnDef<TransferItem>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'from_warehouse',
        header: 'From warehouse',
    },

    {
        accessorKey: 'to_warehouse',
        header: 'To warehouse',
    },
    {
        accessorKey: 'product_name',
        header: 'Product name',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
    },
];

export const inventoryListCols: ColumnDef<InventoryItem>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },
    {
        accessorKey: 'barcode',
        header: 'Barcode',
    },
    {
        accessorKey: 'salings',
        header: 'Sales',
    },
    {
        accessorKey: 'buyings',
        header: 'Buys',
    },
    {
        accessorKey: 'total_price',
        header: 'Total price',
    },
    {
        accessorKey: 'warehouse_balance',
        header: 'Balance',
    },
];
