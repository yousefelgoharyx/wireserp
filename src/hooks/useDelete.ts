import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function deleteFn<Response>(url: string) {
    const response = await instance.post<Response>(url);
    return response.data;
}

const useCreate = <Response = AxiosResponse<any>>(
    key: string[],
    url: string
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => deleteFn<Response>(url), {
        onSuccess: () => {
            queryClient.invalidateQueries([...key]);
        },
    });

    return {
        remove: mutation.mutateAsync,
        isRemoving: mutation.isLoading,
    };
};

export default useCreate;
