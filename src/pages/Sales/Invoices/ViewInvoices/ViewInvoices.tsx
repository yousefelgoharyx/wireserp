import { Select, Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientsList } from '../../../../api/debts/useClients';
import {
  useInvoicesMutation,
  useInvoicesQuery,
} from '../../../../api/sales/useInvoices';
import { useWarehousesList } from '../../../../api/store/useWarehouses';
import DataGrid from '../../../../components/DataGrid';
import FormGrid from '../../../../components/FormGrid';
import getApiError from '../../../../utils/getApiError';
import { getViewAllCols } from './model/columns';

type Filters = {
  [Property in keyof Invoice]?: Invoice[Property];
};
const ViewInvoices = () => {
  const invoiceService = useInvoicesMutation();
  const { data: invoices } = useInvoicesQuery();
  const { selectItems: clients } = useClientsList();
  const navigate = useNavigate();
  const { selectItems: warehouses } = useWarehousesList();
  const [filters, setFilters] = useState<Filters>({
    client_id: null,
    warehouse_id: null,
  });

  function handleClientChange(clientId: string) {
    setFilters({ ...filters, client_id: +clientId });
  }
  function handleWarehouseChange(warehouseId: string) {
    setFilters({ ...filters, warehouse_id: +warehouseId });
  }

  async function handleDelete(invoiceId: number) {
    try {
      await invoiceService.removeInvoice(invoiceId);
      showNotification({ message: 'Invoice deleted' });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }

  const cols = getViewAllCols({
    isDeleting: invoiceService.isRemovingInvoice,
    onView: (id) => navigate(`/invoices/view/${id}`),
    onDelete: handleDelete,
  });

  let filteredInvoice = invoices;
  Object.keys(filters).forEach((filterKey) => {
    let filterValue = filters[filterKey];
    if (filterValue) {
      filteredInvoice = invoices.filter(
        (invoice) => invoice[filterKey] === filterValue
      );
    }
  });
  return (
    <Stack>
      <Title>Filters</Title>
      <FormGrid>
        <Select
          clearable
          placeholder="Client"
          data={clients}
          onChange={handleClientChange}
        />
        <Select
          clearable
          placeholder="Warehouse"
          data={warehouses}
          onChange={handleWarehouseChange}
        />
      </FormGrid>
      <Title>Entries</Title>
      <DataGrid pageSize={10} columns={cols} data={filteredInvoice} />
    </Stack>
  );
};

export default ViewInvoices;
