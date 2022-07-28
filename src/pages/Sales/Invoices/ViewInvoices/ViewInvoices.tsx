import { Select, Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useClientsList } from '../../../../api/debts/useClients';
import { useWarehousesList } from '../../../../api/store/useWarehouses';
import DataGrid from '../../../../components/DataGrid';
import FormGrid from '../../../../components/FormGrid';
import useRead from '../../../../hooks/useRead';
import useRemove from '../../../../hooks/useRemove';
import getApiError from '../../../../utils/getApiError';
import toSelectItems from '../../../../utils/toSelectItems';
import { getViewAllCols } from './model/columns';

type Filters = {
  [Property in keyof Invoice]?: Invoice[Property];
};
const ViewInvoices = () => {
  const { data: invoices } = useRead<Invoice[]>(['invoices'], '/sale-bills');
  const { remove, isRemoving } = useRemove(['invoices'], '/sale-bills');
  const { data: clients } = useClientsList();
  const { data: warehouses } = useWarehousesList();
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

  async function handleDelete(id: number) {
    try {
      await remove(id);
      showNotification({ message: 'Invoice deleted' });
    } catch (error) {
      showNotification({
        message: getApiError(error.response.data),
        color: 'red',
      });
    }
  }
  const clientsSelectItems = toSelectItems(clients, {
    labelKey: 'c_name',
    valueKey: 'id',
  });
  const warehousesSelectItem = toSelectItems(warehouses, {
    labelKey: 'warehouse_name',
    valueKey: 'id',
  });
  const cols = getViewAllCols({
    isDeleting: isRemoving,
    onView: (id) => {},
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
          data={clientsSelectItems}
          onChange={handleClientChange}
        />
        <Select
          clearable
          placeholder="Warehouse"
          data={warehousesSelectItem}
          onChange={handleWarehouseChange}
        />
      </FormGrid>
      <Title>Entries</Title>
      <DataGrid pageSize={10} columns={cols} data={filteredInvoice} />
    </Stack>
  );
};

export default ViewInvoices;
