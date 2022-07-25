import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function transfer(values: KosomAhmedIbrahim) {
  return instance.post('/transfer-warehouses', values);
}
async function fetch() {
  const response = await instance.post<TransferItem[]>(
    '/all-transfer-warehouses',
    {
      warehouse_id: null,
      from: null,
      to: null,
    }
  );
  return response.data;
}

const useTransfer = () => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries('transfer-list');
      queryClient.invalidateQueries('products');
    },
  };
  const mutation = useMutation(transfer, options);
  const query = useQuery('transfer-list', fetch);
  return {
    ...query,
    transfer: mutation.mutateAsync,
    isTransfering: mutation.isLoading,
  };
};

export default useTransfer;
