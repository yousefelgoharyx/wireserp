import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function transfer(values: KosomAhmedIbrahim) {
    return instance.post('/transfer-warehouses', values);
}

const useInventory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(transfer);
    return mutation;
};

export default useInventory;
