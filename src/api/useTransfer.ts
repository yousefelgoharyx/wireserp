import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function transfer(values: KosomAhmedIbrahim) {
    return instance.post('/transfer-warehouses', values);
}

const useTransfer = () => {
    const queryClient = useQueryClient();
    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries(['products', 'warehouses']);
        },
    };
    const mutation = useMutation(transfer, options);
    return mutation;
};

export default useTransfer;
