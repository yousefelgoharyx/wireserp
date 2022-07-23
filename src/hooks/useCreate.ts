import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import instance from '../utils/axios';

async function create<Body, Response>(url: string, data: Body) {
    const response = await instance.post<Response>(url, data);
    return response.data;
}

const useCreate = <Body, Response = AxiosResponse<any>>(
    keys: string[],
    url: string
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (data: Body) => create<Body, Response>(url, data),
        {
            onSuccess: () => {
                keys.forEach((key) => {
                    queryClient.invalidateQueries(key);
                });
            },
        }
    );

    return {
        create: mutation.mutateAsync,
        isCreating: mutation.isLoading,
    };
};

export default useCreate;
