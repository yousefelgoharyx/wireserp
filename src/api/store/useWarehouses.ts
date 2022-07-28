import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';
import toSelectItems from '../../utils/toSelectItems';

async function fetcher() {
  const response = await instance.post<Warehouse[]>('/warehouses');
  return response.data;
}

function deleteWarehouse(id: number) {
  return instance.post('/delete-warehouse', { warehouse_id: id });
}

const useWarehouses = () => {
  const queryClient = useQueryClient();
  const query = useQuery('warehouses', fetcher);
  const mutation = useMutation(deleteWarehouse, {
    onSuccess: () => {
      queryClient.invalidateQueries('warehouses');
    },
  });

  return {
    ...query,
    remove: mutation.mutateAsync,
    isRemoving: mutation.isLoading,
  };
};

export const useWarehousesList = () => {
  const { data } = useQuery('warehouses', fetcher);
  const selectItems = toSelectItems(data, {
    labelKey: 'warehouse_name',
    valueKey: 'id',
  });
  return {
    data,
    selectItems,
  };
};

export function WarehousesToSelectItems(warehouses: Warehouse[]): SelectItem[] {
  return warehouses.map(
    (warehouse): SelectItem => ({
      label: warehouse.warehouse_name,
      value: warehouse.id.toString(),
    })
  );
}
export default useWarehouses;
