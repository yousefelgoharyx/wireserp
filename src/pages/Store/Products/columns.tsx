import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProductTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'product_name',
        header: 'Name',
    },
    {
        accessorKey: 'product_model',
        header: 'Model',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'warehouse',
        header: 'Warehouse',
    },
    {
        accessorKey: 'warehouse_balance',
        header: 'Balance',
    },

    {
        accessorKey: 'piece_price',
        header: 'Piece price',
    },
    {
        accessorKey: 'total_price',
        header: 'Total price',
    },
    {
        accessorKey: 'wholesale_price',
        header: 'Wholesale price',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'sub_category',
        header: 'Subcategory',
    },
    {
        accessorKey: 'product_unit',
        header: 'Unit',
    },
    {
        accessorKey: 'barcode',
        header: 'Barcode',
    },
    {
        accessorKey: 'min_stock',
        header: 'Min Stock',
    },
    {
        accessorKey: 'image',
        header: 'Image',
    },
];
