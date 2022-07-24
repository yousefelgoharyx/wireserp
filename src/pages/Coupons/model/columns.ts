import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const couponsCols: ColumnDef<Coupon>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'discount',
        header: 'Discount',
    },
    {
        accessorKey: 'expire_date',
        header: 'Expire date',
        cell: (table) =>
            dayjs(table.row.original.expire_date).format('YYYY-MM-DD'),
    },
    {
        accessorKey: 'section',
        header: 'Section',
    },
    {
        accessorKey: 'item_name',
        header: 'Item',
    },
];
