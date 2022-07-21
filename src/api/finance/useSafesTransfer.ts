import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function transfer(values: SafeTransferFormValues) {
    return instance.post('/transfer-safes', values);
}
async function fetch() {
    const response = await instance.get<SafeTransfer[]>('/transfer-safes');
    return response.data;
}

const useSafesTransfer = () => {
    const queryClient = useQueryClient();
    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('safe-transfers');
        },
    };
    const mutation = useMutation(transfer, options);
    const query = useQuery('safe-transfers', fetch);
    return {
        ...query,
        transfer: mutation.mutateAsync,
        isTransfering: mutation.isLoading,
    };
};

export default useSafesTransfer;
