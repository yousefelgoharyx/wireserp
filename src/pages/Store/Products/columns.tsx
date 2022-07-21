import { Anchor, Image, Text } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
const companyId = JSON.parse(localStorage.getItem('user'))?.company_id;
export const columns: ColumnDef<ProductTable>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'product_name',
        header: 'Name',
        size: 150,
    },
    {
        accessorKey: 'product_model',
        header: 'Model',
        size: 150,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
    },
    {
        accessorKey: 'warehouse',
        header: 'Warehouse',
        size: 150,
    },
    {
        accessorKey: 'warehouse_balance',
        header: 'Balance',
        size: 130,
    },

    {
        accessorKey: 'piece_price',
        header: 'Piece price',
        size: 130,
    },
    {
        accessorKey: 'total_price',
        header: 'Total price',
        size: 130,
    },
    {
        accessorKey: 'wholesale_price',
        header: 'Wholesale price',
        size: 130,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        size: 130,
    },
    {
        accessorKey: 'sub_category',
        header: 'Subcategory',
        size: 130,
    },
    {
        accessorKey: 'product_unit',
        header: 'Unit',
        size: 130,
    },
    {
        accessorKey: 'barcode',
        header: 'Barcode',
        size: 150,
    },
    {
        accessorKey: 'min_stock',
        header: 'Min Stock',
        size: 130,
    },
    {
        accessorKey: 'image',
        header: 'Image',
        size: 70,
        cell: (row) => {
            const src = `https://erp.digitwires.com/storage/products/company-${companyId}/${row.row.original.image}`;

            if (row.row.original.image)
                return (
                    <Anchor target="_blank" href={src}>
                        <Image width={32} height={32} src={src} />
                    </Anchor>
                );
            return <Text>N/A</Text>;
        },
    },
];
