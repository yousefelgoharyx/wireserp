import { useMutation } from 'react-query';
import instance from '../utils/axios';

async function getInventory(values: InventoryFormValues) {
    const response = await instance.post<InventoryItem[]>(
        '/warehouse-inventory',
        values
    );
    return response.data;
}
const useInventory = () => {
    const mutation = useMutation(getInventory);
    return {
        get: mutation.mutateAsync,
        isGetting: mutation.isLoading,
        data: mutation.data,
    };
};

export default useInventory;
