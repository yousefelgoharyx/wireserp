import { Stack } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import DataGrid from '../../../../components/DataGrid';
import EditDelete from '../../../../components/EditDelete';
import { useInvoiceContext } from './context/InvoiceContext';
import { invoiceCols } from './model/columns';
import useInvoiceRemove from './services/useInvoiceRemove';

const InvoicesTable = () => {
  const invoice = useInvoiceContext();
  const invoiceRemover = useInvoiceRemove();
  const cols: ColumnDef<InvoiceItem>[] = [
    ...invoiceCols,
    {
      id: 'select',
      header: 'Actions',
      cell: ({ row }) => (
        <EditDelete
          isDeleting={invoiceRemover.isRemovingInvoiceProduct}
          onDelete={() => {
            invoiceRemover.removeInvoiceProduct(row.original.product_id);
          }}
        />
      ),
    },
  ];
  if (invoice.invoiceRows.length <= 0) return;
  return (
    <Stack>
      <DataGrid columns={cols} data={invoice.invoiceRows} />
    </Stack>
  );
};

export default InvoicesTable;
