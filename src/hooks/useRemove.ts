import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function deleteFn<Response>(url: string, id: number) {
    const response = await instance.delete<Response>(`${url}/${id}`);
    return response.data;
}

const useRemove = <Response = AxiosResponse<any>>(
    keys: string[],
    url: string
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<any, any, number>(
        (id) => deleteFn<Response>(url, id),
        {
            onSuccess: () => {
                keys.forEach((key) => {
                    queryClient.invalidateQueries(key);
                });
            },
        }
    );
    async function remove(id: number) {
        return mutation.mutateAsync(id);
    }
    return {
        remove,
        isRemoving: mutation.isLoading,
    };
};

export default useRemove;
