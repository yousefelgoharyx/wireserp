import { ColumnDef } from '@tanstack/react-table';
import moneyFormatter from '../../../../utils/moneyFormatter';

export const bankCols: ColumnDef<Bank>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
    },

    {
        accessorKey: 'bank_name',
        header: 'Bank name',
    },

    {
        accessorKey: 'bank_balance',
        header: 'Bank balance',
        cell: (table) => {
            return moneyFormatter(table.row.original.bank_balance.toString());
        },
    },
];

export const cashCols: ColumnDef<Cash>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'bank_name',
        header: 'Bank',
    },
    {
        accessorKey: 'process_type',
        header: 'Type',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (table) => {
            return moneyFormatter(table.row.original?.amount?.toString());
        },
    },
    {
        accessorKey: 'notes',
        header: 'Reason',
    },
    {
        accessorKey: 'admin',
        header: 'Admin',
    },
];

export const bankTransferCols: ColumnDef<BankTransfer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'from_bank',
        header: 'From Bank',
    },
    {
        accessorKey: 'to_bank',
        header: 'To Bank',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (table) => {
            return moneyFormatter(table.row.original?.amount?.toString());
        },
    },
    {
        accessorKey: 'notes',
        header: 'Reason',
    },
    {
        accessorKey: 'admin',
        header: 'Admin',
    },
];

export const bankSafeTransferCols: ColumnDef<BankSafeTransfer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'bank',
        header: 'From bank',
    },
    {
        accessorKey: 'safe',
        header: 'To safe',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (table) => {
            return moneyFormatter(table.row.original?.amount?.toString());
        },
    },
    {
        accessorKey: 'notes',
        header: 'Reason',
    },
    {
        accessorKey: 'admin',
        header: 'Admin',
    },
];

export const safeBankTransfer: ColumnDef<BankSafeTransfer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'safe',
        header: 'From safe',
    },
    {
        accessorKey: 'bank',
        header: 'To bank',
    },

    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (table) => {
            return moneyFormatter(table.row.original?.amount?.toString());
        },
    },
    {
        accessorKey: 'notes',
        header: 'Reason',
    },
    {
        accessorKey: 'admin',
        header: 'Admin',
    },
];
