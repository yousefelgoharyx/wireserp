import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function fetcher() {
    const response = await instance.post<Supplier[]>('/suppliers');
    return response.data;
}

const remove = (id: number) => instance.post('/delete-supplier', { id });
const create = (c: SupplierFormValues) => instance.post('/add-supplier', c);
const update = (c: Supplier) => instance.post('/edit-supplier', c);

const useSuppliers = () => {
    const queryClient = useQueryClient();
    const query = useQuery('suppliers', fetcher);

    const options = {
        onSuccess: () => queryClient.invalidateQueries('suppliers'),
    };
    const deleteOwner = useMutation(remove, options);
    const createOwner = useMutation(create, options);
    const updateOwner = useMutation(update, options);

    return {
        ...query,
        remove: deleteOwner.mutateAsync,
        isRemoving: deleteOwner.isLoading,
        create: createOwner.mutateAsync,
        isCreating: createOwner.isLoading,
        update: updateOwner.mutateAsync,
        isUpdating: updateOwner.isLoading,
    };
};

export const useSuppliersList = () => {
    return useQuery('suppliers', fetcher);
};

export default useSuppliers;
