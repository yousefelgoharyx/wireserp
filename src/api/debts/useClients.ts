import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function fetcher() {
    const response = await instance.post<Client[]>('/clients');
    return response.data;
}

const remove = (id: number) => instance.post('/delete-client', { id });
const create = (c: ClientFormValues) => instance.post('/add-client', c);
const update = (c: Client) => instance.post('/edit-client', c);

const useClients = () => {
    const queryClient = useQueryClient();
    const query = useQuery('clients', fetcher);

    const options = {
        onSuccess: () => queryClient.invalidateQueries('clients'),
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

export const useClientsList = () => {
    return useQuery('branches', fetcher);
};

export default useClients;
