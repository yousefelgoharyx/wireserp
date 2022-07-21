import { SelectItem } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import instance from '../../utils/axios';

async function read() {
    const response = await instance.get<Safe[]>('/safes');
    return response.data;
}

const remove = (id: number) => instance.delete(`/safes/${id}`);
const update = (safe: Safe) => instance.put(`/safes`, safe);
const create = (safe: SafeFormValues) => instance.post(`/safes`, safe);

const useSafes = () => {
    const queryClient = useQueryClient();
    const query = useQuery('safes', read);

    const options = {
        onSuccess: () => {
            queryClient.invalidateQueries('safes');
        },
    };
    const removeOwner = useMutation(remove, options);
    const createOwner = useMutation(create, options);
    const updateOwner = useMutation(update, options);
    return {
        ...query,
        remove: removeOwner.mutateAsync,
        isRemoving: removeOwner.isLoading,
        create: createOwner.mutateAsync,
        isCreating: createOwner.isLoading,
        update: updateOwner.mutateAsync,
        isUpdating: updateOwner.isLoading,
    };
};

export function safesToSelectItems(safes: Safe[]): SelectItem[] {
    return safes.map(
        (safe): SelectItem => ({
            label: safe.safe_name,
            value: safe.id.toString(),
        })
    );
}
export default useSafes;
