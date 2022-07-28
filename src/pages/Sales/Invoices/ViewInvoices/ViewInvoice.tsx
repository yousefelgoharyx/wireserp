import { Stack, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvoicesQuery } from '../../../../api/sales/useInvoices';
import DataGrid from '../../../../components/DataGrid';
import { getInvoiceProductsCols } from './model/columns';

const ViewInvoice = () => {
  const invoices = useInvoicesQuery();
  const navigate = useNavigate();
  const { id } = useParams();

  const invoice = invoices.data.find((invoice) => invoice.id === +id);
  function handleReturn(productId: number) {
    navigate('/invoices/return-product/', {
      state: { id: invoice.id, product_id: productId },
    });
  }

  return (
    <Stack>
      <Title>Invoice#{invoice.id}</Title>
      <Title order={2}>Product</Title>
      <DataGrid
        data={invoice.products}
        columns={getInvoiceProductsCols({
          onReturn: handleReturn,
          isReturning: false,
        })}
      />
    </Stack>
  );
};

export default ViewInvoice;
